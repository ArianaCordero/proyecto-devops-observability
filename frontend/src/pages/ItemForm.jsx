import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ItemsAPI } from "../api/items";
import { IconEdit, IconPlus } from "../components/icons";

export default function ItemForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(mode === "edit");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (mode !== "edit") return;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const it = await ItemsAPI.get(id);
        setTitle(it.title || "");
        setDescription(it.description || "");
      } catch (e) {
        setError(e.message || "No se pudo cargar el item");
      } finally {
        setLoading(false);
      }
    })();
  }, [mode, id]);

  const titleLen = title.trim().length;
  const descLen = description.trim().length;
  const canSave = useMemo(
    () => titleLen >= 3 && titleLen <= 80 && descLen <= 300,
    [titleLen, descLen]
  );

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!canSave) {
      setError("Título: 3–80 caracteres. Descripción: máx 300.");
      return;
    }
    setSaving(true);
    try {
      const payload = { title: title.trim(), description: description.trim() };
      if (mode === "create") await ItemsAPI.create(payload);
      if (mode === "edit") await ItemsAPI.update(id, payload);
      navigate("/");
    } catch (e) {
      setError(e.message || "Error guardando");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 className="h1">
            {mode === "create" ? "Crear item" : `Editar item #${id}`}
          </h1>
          <p className="sub">
            Formulario bonito para agregar items y probar el CRUD:D
          </p>
        </div>
        <Link to="/" className="btn" style={{ textDecoration: "none" }}>
          ← Volver
        </Link>
      </div>

      <section className="card" style={{ marginTop: 14 }}>
        <div className="cardHead">
          <span className="badge">
            Ruta: <span className="mono">/api/items</span>
          </span>
          <span className="badge">
            {mode === "create" ? "Nuevo" : "Edición"}
          </span>
        </div>

        <div className="cardBody">
          {loading && (
            <div style={{ display: "grid", gap: 10 }}>
              <div className="skel" style={{ height: 46 }} />
              <div className="skel" style={{ height: 140 }} />
            </div>
          )}

          {!loading && (
            <form
              onSubmit={onSubmit}
              style={{ display: "grid", gap: 12, maxWidth: 820 }}
            >
              <div>
                <label
                  className="small"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Título (requerido)</span>
                  <span className="mono muted">{titleLen}/80</span>
                </label>
                <input
                  className="input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Laptop Asus F15"
                />
              </div>

              <div>
                <label
                  className="small"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Descripción</span>
                  <span className="mono muted">{descLen}/300</span>
                </label>
                <textarea
                  className="input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ej: es una laptop bonita"
                  rows={6}
                  style={{ resize: "vertical" }}
                />
              </div>

              {error && (
                <div
                  className="card"
                  style={{
                    padding: 12,
                    borderRadius: 16,
                    borderColor: "rgba(255,77,109,.35)",
                  }}
                >
                  <strong className="error">Error</strong>
                  <div className="small" style={{ marginTop: 6 }}>
                    {error}
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  type="submit"
                  className={`btn ${canSave ? "btnPrimary" : ""}`}
                  disabled={saving}
                  style={{ opacity: saving ? 0.7 : 1 }}
                >
                  {mode === "create" ? <IconPlus /> : <IconEdit />}
                  <span style={{ fontWeight: 900 }}>
                    {saving ? "Guardando…" : "Guardar"}
                  </span>
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => navigate("/")}
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
