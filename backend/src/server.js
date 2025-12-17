const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

const pool = new Pool({
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "appdb",
});

function log(level, message, meta = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    service: "backend",
    message,
    ...meta,
  };
  console.log(JSON.stringify(entry));
}

app.get("/health", async (req, res) => {
  res.json({ ok: true });
});

app.get("/items", async (req, res) => {
  const start = Date.now();
  try {
    const result = await pool.query("SELECT * FROM items ORDER BY id DESC");
    log("INFO", "GET /items", { status: 200, latency_ms: Date.now() - start });
    res.json(result.rows);
  } catch (e) {
    log("ERROR", "GET /items failed", { status: 500, error: e.message });
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/items/:id", async (req, res) => {
  const start = Date.now();
  const id = Number(req.params.id);
  try {
    const result = await pool.query("SELECT * FROM items WHERE id=$1", [id]);
    if (result.rowCount === 0) {
      log("INFO", "GET /items/:id not found", { status: 404, item_id: id, latency_ms: Date.now() - start });
      return res.status(404).json({ error: "Not found" });
    }
    log("INFO", "GET /items/:id", { status: 200, item_id: id, latency_ms: Date.now() - start });
    res.json(result.rows[0]);
  } catch (e) {
    log("ERROR", "GET /items/:id failed", { status: 500, item_id: id, error: e.message });
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/items", async (req, res) => {
  const start = Date.now();
  const { title, description } = req.body || {};

  if (!title || String(title).trim() === "") {
    log("ERROR", "POST /items validation error", { status: 400 });
    return res.status(400).json({ error: "title is required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO items(title, description) VALUES($1, $2) RETURNING *",
      [title, description || null]
    );
    log("INFO", "POST /items created", { status: 201, item_id: result.rows[0].id, latency_ms: Date.now() - start });
    res.status(201).json(result.rows[0]);
  } catch (e) {
    log("ERROR", "POST /items failed", { status: 500, error: e.message });
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/items/:id", async (req, res) => {
  const start = Date.now();
  const id = Number(req.params.id);
  const { title, description } = req.body || {};

  if (!title || String(title).trim() === "") {
    log("ERROR", "PUT /items/:id validation error", { status: 400, item_id: id });
    return res.status(400).json({ error: "title is required" });
  }

  try {
    const result = await pool.query(
      "UPDATE items SET title=$1, description=$2 WHERE id=$3 RETURNING *",
      [title, description || null, id]
    );

    if (result.rowCount === 0) {
      log("INFO", "PUT /items/:id not found", { status: 404, item_id: id, latency_ms: Date.now() - start });
      return res.status(404).json({ error: "Not found" });
    }

    log("INFO", "PUT /items/:id updated", { status: 200, item_id: id, latency_ms: Date.now() - start });
    res.json(result.rows[0]);
  } catch (e) {
    log("ERROR", "PUT /items/:id failed", { status: 500, item_id: id, error: e.message });
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/items/:id", async (req, res) => {
  const start = Date.now();
  const id = Number(req.params.id);

  try {
    const result = await pool.query("DELETE FROM items WHERE id=$1 RETURNING id", [id]);

    if (result.rowCount === 0) {
      log("INFO", "DELETE /items/:id not found", { status: 404, item_id: id, latency_ms: Date.now() - start });
      return res.status(404).json({ error: "Not found" });
    }

    log("INFO", "DELETE /items/:id deleted", { status: 200, item_id: id, latency_ms: Date.now() - start });
    res.json({ ok: true });
  } catch (e) {
    log("ERROR", "DELETE /items/:id failed", { status: 500, item_id: id, error: e.message });
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  log("INFO", "Backend started", { port: PORT });
});
