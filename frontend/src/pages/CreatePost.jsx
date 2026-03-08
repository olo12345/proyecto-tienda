import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const { id } = useParams(); // Si hay un ID en la URL, significa que estamos editando
  const isEditing = Boolean(id);

 // verificado, cumple con lo que pide el contrato
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: ""
  });

  // Si estamos en modo edición, aquí cargaríamos los datos del libro
  useEffect(() => {
    if (isEditing) {
      console.log("Modo edición activado para el libro con ID:", id);
      // Simulación: fetch al backend para traer los datos del libro a editar
      // setFormData({ title: "Libro a editar", ... });
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Formateamos los datos según el contrato (price y stock deben ser números)
    const payloadToSend = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      stock: Number(formData.stock)
    };

    if (isEditing) {
      console.log("Actualizando publicación en backend:", payloadToSend);
      // Aquí iría: await axios.put(`/book/${id}`, payloadToSend) estar atento
      alert("Publicación actualizada con éxito");
    } else {
      console.log("Creando nueva publicación en backend:", payloadToSend);
      // Aquí iría: await axios.post('/books', payloadToSend) estar atento
      alert("Publicación creada con éxito");
    }

    // Redirigimos de vuelta al panel de administración
    navigate("/admin/store");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        {isEditing ? "Editar Publicación" : "Crear Nueva Publicación"}
      </h1>

      <form onSubmit={handleSubmit} style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
        
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Título del Libro:</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            placeholder="Ej: The Art and Science of Premium Gin"
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Categoría:</label>
          <input 
            type="text" 
            name="category" 
            value={formData.category} 
            onChange={handleChange} 
            required 
            placeholder="Ej: Destilación, Negocios, Programación..."
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Precio (CLP):</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              required 
              min="0"
              style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Stock Inicial:</label>
            <input 
              type="number" 
              name="stock" 
              value={formData.stock} 
              onChange={handleChange} 
              required 
              min="0"
              style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Descripción:</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
            rows="5"
            placeholder="Escribe una descripción detallada del libro..."
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box", resize: "vertical" }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button 
            type="button" 
            onClick={() => navigate("/admin/store")}
            style={{ padding: "10px 20px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Cancelar
          </button>

          <button 
            type="submit" 
            style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
          >
            {isEditing ? "Guardar Cambios" : "Publicar Libro"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default CreatePost;