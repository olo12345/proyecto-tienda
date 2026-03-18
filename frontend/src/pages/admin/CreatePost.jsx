import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { getProduct, updateProduct, createProduct } from "./../../services/products";
import { useBooks } from "./../../hooks/useBooks"

function CreatePost() {
  const navigate = useNavigate();
  const { id } = useParams(); // Si hay un ID en la URL, significa que estamos editando
  const isEditing = Boolean(id);

  const { book, fetchBookByID, updateBook, addBook } = useBooks();


  const [formData, setFormData] = useState({
      titulo: "",
      autor: "",
      descripcion: "",
      precio: "",
      categorias: "",
      stock: "",
      imagen_url: "" // ver si da tiempo de agregar la validación de seguridad que vi en ig 
      // (para evitar que suban un virus solo por cambiarle la extensión)
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (isEditing) {
      console.log("Modo edición activado para el libro con ID:", id);
      fetchBookByID(id)
        .then((data) => {
          if (data) {
            // Mapeamos lo que viene del back al estado del form
            setFormData({
              titulo: data.libro_titulo || data.titulo || "",
              autor: data.libro_autor || data.autor || "",
              descripcion: data.libro_descripcion || data.descripcion || "",
              precio: data.libro_precio || data.precio || "",
              categorias: data.libro_categorias || data.categorias || "",
              stock: data.libro_stock || data.stock || "",
              imagen_url: data.libro_imagen || data.imagen_url || ""
            });
          }
        })
        .catch((err) => {
          console.error("Error al obtener el libro:", err);
        });
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Formateamos los datos según el contrato del backend
    const payloadToSend = {
      titulo: formData.titulo,
      autor: formData.autor,
      descripcion: formData.descripcion,
      precio: Number(formData.precio),
      categorias: formData.categorias,
      stock: Number(formData.stock),
      imagen_url: formData.imagen_url,
      libro_fecha_publicacion: new Date().toISOString()
    };

    if (isEditing) {
      console.log("Actualizando publicación en backend:", payloadToSend);
      try {
        const res = await updateBook(id, payloadToSend); // Pasamos ID y payload
        if (res) {
          alert("Publicación actualizada con éxito");
          navigate("/admin/store");
        }
      }
      catch (err) {
        console.error("Error al actualizar la publicación:", err);
        alert("Error al actualizar la publicación");
      };
    } else {
      console.log("Creando nueva publicación en backend:", payloadToSend);
      addBook(payloadToSend)
        .then((res) => {
          if (res) {
            alert("Publicación creada con éxito");
            navigate("/admin/store");
          }
        })
        .catch((err) => {
          console.error("Error al crear la publicación:", err);
          alert("Error al crear la publicación");
        })
    }
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto", color: "var(--text-light)", minHeight: "80vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "var(--accent-cyan)", letterSpacing: "1px", textTransform: "uppercase" }}>
        {isEditing ? "Editar Publicación" : "Crear Nueva Publicación"}
      </h1>

      <form onSubmit={handleSubmit} style={{
        backgroundColor: "var(--bg-card)",
        padding: "30px",
        borderRadius: "8px",
        border: "1px solid var(--bg-border)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
      }}>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "var(--text-muted)", fontSize: "0.9rem" }}>Título del Libro:</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            placeholder="Ej: The Art and Science of Premium Gin"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid var(--bg-border)",
              backgroundColor: "var(--bg-space)",
              color: "var(--text-light)",
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.2s ease"
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent-cyan)"}
            onBlur={(e) => e.target.style.borderColor = "var(--bg-border)"}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "var(--text-muted)", fontSize: "0.9rem" }}>Categoría:</label>
          <input
            type="text"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            required
            placeholder="Ej: Destilación, Negocios, Programación..."
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid var(--bg-border)",
              backgroundColor: "var(--bg-space)",
              color: "var(--text-light)",
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.2s ease"
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent-cyan)"}
            onBlur={(e) => e.target.style.borderColor = "var(--bg-border)"}
          />
        </div>

        {/* incorporado */}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "var(--text-muted)", fontSize: "0.9rem" }}>URL de la Imagen:</label>
          <input
            type="text"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleChange}
            required
            placeholder="https://link-a-la-foto.jpg"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "var(--text-muted)", fontSize: "0.9rem" }}>Categoría:</label>
          <input
            type="text"
            name="categorias"
            value={formData.categorias}
            onChange={handleChange}
            required
            placeholder="Ej: Destilación, Negocios, Programación..."
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid var(--bg-border)",
              backgroundColor: "var(--bg-space)",
              color: "var(--text-light)",
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.2s ease"
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent-cyan)"}
            onBlur={(e) => e.target.style.borderColor = "var(--bg-border)"}
          />
        </div>

        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "var(--text-muted)", fontSize: "0.9rem" }}>Precio (CLP):</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              required
              min="0"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid var(--bg-border)",
                backgroundColor: "var(--bg-space)",
                color: "var(--text-light)",
                boxSizing: "border-box",
                outline: "none",
                transition: "border-color 0.2s ease"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent-cyan)"}
              onBlur={(e) => e.target.style.borderColor = "var(--bg-border)"}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "var(--text-muted)", fontSize: "0.9rem" }}>Stock Inicial:</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid var(--bg-border)",
                backgroundColor: "var(--bg-space)",
                color: "var(--text-light)",
                boxSizing: "border-box",
                outline: "none",
                transition: "border-color 0.2s ease"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent-cyan)"}
              onBlur={(e) => e.target.style.borderColor = "var(--bg-border)"}
            />
          </div>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "var(--text-muted)", fontSize: "0.9rem" }}>Descripción:</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Escribe una descripción detallada del libro..."
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "4px",
              border: "1px solid var(--bg-border)",
              backgroundColor: "var(--bg-space)",
              color: "var(--text-light)",
              boxSizing: "border-box",
              resize: "vertical",
              outline: "none",
              transition: "border-color 0.2s ease"
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent-cyan)"}
            onBlur={(e) => e.target.style.borderColor = "var(--bg-border)"}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px", borderTop: "1px solid var(--bg-border)" }}>
          <button
            type="button"
            onClick={() => navigate("/admin/store")}
            style={{
              padding: "12px 24px",
              backgroundColor: "transparent",
              color: "var(--text-muted)",
              border: "1px solid var(--text-muted)",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              textTransform: "uppercase",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--text-muted)";
              e.currentTarget.style.color = "var(--bg-space)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            Cancelar
          </button>

          <button
            type="submit"
            style={{
              padding: "12px 24px",
              backgroundColor: "var(--accent-cyan)",
              color: "var(--bg-space)",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
              transition: "box-shadow 0.2s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 229, 255, 0.4)"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
          >
            {isEditing ? "Guardar Cambios" : "Publicar Libro"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default CreatePost;