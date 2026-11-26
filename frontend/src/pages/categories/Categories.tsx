import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import {
  Categoria,
  CategoriaInput,
  getCategorias,
  updateCategoria,
  createCategoria,
  deleteCategoria,
} from "./categorias.service";
import "./Categories.css";

export default function Categories() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Estados del formulario
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [formData, setFormData] = useState<CategoriaInput>({
    categoria_nombre: "",
    categoria_descripcion: "",
    categoria_estado: "ACT",
  });
  const [guardando, setGuardando] = useState(false);

  const cargarCategorias = async () => {
    try {
      setLoading(true);
      const data = await getCategorias();
      setCategorias(Array.isArray(data) ? data : []);
      setError("");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error al cargar las categorías",
      );
      setCategorias([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.categoria_nombre.trim()) {
      setError("El nombre de la categoría es obligatorio.");
      return;
    }

    if (formData.categoria_descripcion.length > 50) {
      setError("La descripción no puede superar los 50 caracteres.");
      return;
    }

    setGuardando(true);

    try {
      if (isEditing && currentId !== null) {
        await updateCategoria(currentId, formData);
        setSuccess("Categoría actualizada correctamente.");
      } else {
        await createCategoria(formData);
        setSuccess("Categoría creada correctamente.");
      }
      resetForm();
      cargarCategorias();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Error al guardar la categoría",
      );
    } finally {
      setGuardando(false);
    }
  };

  const handleEdit = (cat: Categoria) => {
    setIsEditing(true);
    setCurrentId(cat.categoria_id);
    setFormData({
      categoria_nombre: cat.categoria_nombre,
      categoria_descripcion: cat.categoria_descripcion || "",
      categoria_estado: cat.categoria_estado,
    });
    setError("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Estás seguro de eliminar esta categoría?")) return;

    setError("");
    setSuccess("");

    try {
      await deleteCategoria(id);
      setSuccess("Categoría eliminada correctamente.");
      cargarCategorias();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "No se puede eliminar. Puede tener productos asociados.",
      );
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      categoria_nombre: "",
      categoria_descripcion: "",
      categoria_estado: "ACT",
    });
  };

  return (
    <div className="categories-page">
      <main className="categories-main">
        <div className="categories-container">
          <div className="categories-title">
            <h2>Administración de Categorías</h2>
            <p>
              Crea, edita y elimina las categorías de tus productos lácteos.
            </p>
          </div>

          {error && (
            <div className="message error-message" role="alert">
              <span aria-hidden="true">!</span>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="message success-message" role="status">
              <span aria-hidden="true">✓</span>
              <span>{success}</span>
            </div>
          )}

          <div className="categories-layout">
            {/* FORMULARIO */}
            <section className="categories-card">
              <div className="card-title">
                <h3>{isEditing ? "Editar categoría" : "Nueva categoría"}</h3>
                <p>
                  {isEditing
                    ? "Modifica los datos y guarda los cambios."
                    : "Completa los datos para registrar una nueva categoría."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="category-form">
                <div className="form-group">
                  <label htmlFor="categoria_nombre">Nombre *</label>
                  <input
                    id="categoria_nombre"
                    type="text"
                    name="categoria_nombre"
                    value={formData.categoria_nombre}
                    onChange={handleChange}
                    placeholder="Ej. Quesos"
                    maxLength={100}
                    disabled={guardando}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="categoria_descripcion">Descripción</label>
                  <textarea
                    id="categoria_descripcion"
                    name="categoria_descripcion"
                    value={formData.categoria_descripcion}
                    onChange={handleChange}
                    placeholder="Breve descripción de la categoría..."
                    maxLength={50}
                    rows={3}
                    disabled={guardando}
                  />
                  <span className="char-count">
                    {formData.categoria_descripcion.length}/50
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="categoria_estado">Estado</label>
                  <select
                    id="categoria_estado"
                    name="categoria_estado"
                    value={formData.categoria_estado}
                    onChange={handleChange}
                    disabled={guardando}
                  >
                    <option value="ACT">Activa</option>
                    <option value="INA">Inactiva</option>
                  </select>
                </div>

                <div className="form-buttons">
                  <button
                    type="submit"
                    className="category-button"
                    disabled={guardando}
                  >
                    {guardando
                      ? "GUARDANDO..."
                      : isEditing
                        ? "ACTUALIZAR CATEGORÍA"
                        : "CREAR CATEGORÍA"}
                  </button>

                  {isEditing && (
                    <button
                      type="button"
                      className="category-button secondary"
                      onClick={resetForm}
                      disabled={guardando}
                    >
                      CANCELAR
                    </button>
                  )}
                </div>
              </form>
            </section>

            {/* TABLA */}
            <section className="categories-card table-card">
              <div className="card-title">
                <h3>Listado de categorías</h3>
                <p>Consulta, edita o elimina las categorías registradas.</p>
              </div>

              {loading ? (
                <p className="empty-state">Cargando categorías...</p>
              ) : categorias.length === 0 ? (
                <p className="empty-state">
                  Aún no hay categorías registradas.
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="categories-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categorias.map((cat) => (
                        <tr key={cat.categoria_id}>
                          <td>{cat.categoria_id}</td>
                          <td className="cell-name">{cat.categoria_nombre}</td>
                          <td>{cat.categoria_descripcion || "—"}</td>
                          <td>
                            <span
                              className={`badge ${
                                cat.categoria_estado === "ACT" ? "act" : "ina"
                              }`}
                            >
                              {cat.categoria_estado === "ACT"
                                ? "Activa"
                                : "Inactiva"}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                type="button"
                                onClick={() => handleEdit(cat)}
                                className="btn-edit"
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(cat.categoria_id)}
                                className="btn-delete"
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
