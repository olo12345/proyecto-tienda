import { useState, useEffect, useEffectEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { getProduct, updateProduct, createProduct } from "./../../services/products";
import { useBooks } from "./../../hooks/useBooks"

function CreatePost() {
  const navigate = useNavigate();
  const { id } = useParams(); // Si hay un ID en la URL, significa que estamos editando
  const isEditing = Boolean(id);

  const { book, fetchBookByID, updateBook, addBook } = useBooks();


  const [formData, setFormData] = useState({
    ...book ?? {title: "",
    description: "",
    price: "",
    category: "",
    stock: ""}
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const updateFormData = useEffectEvent((book) => {
    setFormData(book);
  })

  const updateFetchBook = useEffectEvent((id) => {
    fetchBookByID(id)
      .then((res) => {
        if (res.status === 200) {
          updateFormData(res.data);
        }
      })
      .catch((err) => {
        console.error("Error al actualizar la publicación:", err);
        alert("Error al actualizar la publicación");
      });
  });


  // Si estamos en modo edición, aquí cargaríamos los datos del libro
  useEffect(() => {

    if (isEditing) {
      // clearForm();
      console.log("Modo edición activado para el libro con ID:", id);
      updateFetchBook(id);
    }
  }, [id, isEditing, navigate]);


  // verificado, cumple con lo que pide el contrato


  const handleSubmit = (e) => {
    e.preventDefault();

    // Formateamos los datos según el contrato (price y stock deben ser números)
    const payloadToSend = {
      ...book,
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      stock: Number(formData.stock)
    };

    if (isEditing) {
      console.log("Actualizando publicación en backend:", payloadToSend);
      try {
        const res = updateBook(payloadToSend)
        if (res.status === 200) {
          console.log("res", res)
          alert("Publicación actualizada con éxito");
        }
      }
      catch (err) {
        console.error("Error al actualizar la publicación:", err, "res");
        alert("Error al actualizar la publicación");
      };
    } else {
      //Creación de libro
      console.log("Creando nueva publicación en backend:", payloadToSend);
      addBook(payloadToSend)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            alert("Publicación creada con éxito");
            navigate("/admin/store");
            // Redirigimos de vuelta al panel de administración
          }
        })
        .catch((err) => {
          console.error("Error al crear la publicación:", err);
          alert("Error al crear la publicación");
        })
      // Aquí iría: await axios.post('/books', payloadToSend) estar atento
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
            name="title"
            value={formData.title}
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
            name="category"
            value={formData.category}
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
              name="price"
              value={formData.price}
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
            name="description"
            value={formData.description}
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