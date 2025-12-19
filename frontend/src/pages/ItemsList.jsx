import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ItemsAPI } from "../api/items";
import { IconEdit, IconPlus, IconSearch, IconTrash } from "../components/icons";

function plural(n, s, p) {
  return n === 1 ? s : p;
}

export default function ItemsList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("new"); // new | old | az

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await ItemsAPI.list();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Error cargando items");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id) {
    const ok = confirm("¿Eliminar este item?");
    if (!ok) return;
    try {
      await ItemsAPI.remove(id);
      await load();
    } catch (e) {
      alert(e.message || "No se pudo eliminar");
    }
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const base = term
      ? items.filter(
          (it) =>
            String(it.id).includes(term) ||
            (it.title || "").toLowerCase().includes(term) ||
            (it.description || "").toLowerCase().includes(term)
        )
      : items.slice();

    if (sort === "az")
      base.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    else if (sort === "old") base.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));
    else base.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    return base;
  }, [items, q, sort]);

  const empty = !loading && !error && filtered.length === 0;

  return (
    <div className="container">
      <div>
        <h1 className="h1">Items</h1>
        <p className="sub">CRUD bonito:D</p>
      </div>

      <div className="stats">
        <div className="stat">
          <div>
            <strong>{filtered.length}</strong>
            <div>
              <span>{plural(filtered.length, "registro", "registros")}</span>
            </div>
          </div>
          <span className="badge">
            <span className="dot" /> API
          </span>
        </div>
      </div>

      <section className="card">
        <div className="cardHead">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span className="badge">
              <span className="dot" /> Conectado por{" "}
              <span className="mono">/api</span>
            </span>
            {!loading && !error && (
              <span className="badge">
                Mostrando{" "}
                <strong style={{ color: "var(--text)" }}>
                  {filtered.length}
                </strong>
              </span>
            )}
          </div>

          <Link
            to="/new"
            className="btn btnPrimary"
            style={{ textDecoration: "none" }}
          >
            <IconPlus /> <span style={{ fontWeight: 900 }}>Nuevo</span>
          </Link>
        </div>

        <div className="cardBody">
          <div className="toolbar">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 11,
                    opacity: 0.8,
                  }}
                >
                  <IconSearch />
                </span>
                <input
                  className="input"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Buscar por id, título o descripción…"
                  style={{ paddingLeft: 40 }}
                />
              </div>

              <select
                className="input select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="new">Orden: nuevos</option>
                <option value="old">Orden: antiguos</option>
                <option value="az">Orden: A → Z</option>
              </select>
            </div>

            <button className="btn" onClick={load} title="Recargar">
              ↻ <span style={{ fontWeight: 900 }}>Refresh</span>
            </button>
          </div>

          {loading && (
            <div style={{ display: "grid", gap: 10 }}>
              <div className="skel" style={{ height: 44 }} />
              <div className="skel" style={{ height: 44 }} />
              <div className="skel" style={{ height: 44 }} />
            </div>
          )}

          {error && (
            <div
              className="card"
              style={{
                padding: 14,
                borderRadius: 16,
                borderColor: "rgba(255,77,109,.35)",
              }}
            >
              <strong className="error">No se pudo cargar</strong>
              <div className="small" style={{ marginTop: 6 }}>
                {error}
              </div>
              <div className="small" style={{ marginTop: 10 }}>
                Tip: asegúrate que el backend esté arriba y exista{" "}
                <span className="mono">GET /items</span>.
              </div>
            </div>
          )}

          {empty && (
            <div className="empty">
              <div className="emptyArt" />
              <h3 style={{ margin: "0 0 6px" }}>Sin registros</h3>
              <p className="muted" style={{ margin: "0 0 14px" }}>
                Crea tu primer item para demostrar CRUD.
              </p>
              <Link
                to="/new"
                className="btn btnPrimary"
                style={{ textDecoration: "none" }}
              >
                <IconPlus /> Crear item
              </Link>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <>
              <div className="tableWrap">
                <table>
                  <thead>
                    <tr>
                      <th style={{ width: 90 }}>ID</th>
                      <th style={{ width: "28%" }}>Título</th>
                      <th>Descripción</th>
                      <th style={{ textAlign: "right", width: 230 }}>
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((it) => (
                      <tr key={it.id}>
                        <td className="mono">{it.id}</td>
                        <td style={{ fontWeight: 800 }}>{it.title}</td>
                        <td
                          className="muted"
                          style={{ whiteSpace: "pre-wrap" }}
                        >
                          {it.description || "-"}
                        </td>
                        <td className="actions">
                          <div className="actionsRow">
                            <Link
                              to={`/edit/${it.id}`}
                              className="btn"
                              style={{ textDecoration: "none" }}
                            >
                              <IconEdit /> Editar
                            </Link>
                            <button
                              className="btn btnDanger"
                              onClick={() => onDelete(it.id)}
                            >
                              <IconTrash /> Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="cards">
                {filtered.map((it) => (
                  <div className="itemCard" key={it.id}>
                    <div className="row">
                      <span className="badge">
                        <span className="mono">#{it.id}</span>
                      </span>
                      <div className="actionsRow">
                        <Link
                          to={`/edit/${it.id}`}
                          className="btn"
                          style={{ textDecoration: "none" }}
                        >
                          <IconEdit /> Editar
                        </Link>
                        <button
                          className="btn btnDanger"
                          onClick={() => onDelete(it.id)}
                        >
                          <IconTrash /> Eliminar
                        </button>
                      </div>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: 16 }}>
                      {it.title}
                    </div>
                    <div className="muted">{it.description || "-"}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
