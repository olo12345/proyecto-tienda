import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; //esto para poder ir a la parte de edición

const ProductList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // Datos imaginarios de backend
  useEffect(() => {
    const fetchBooks = () => {
      const mockData = [
        { id: 1, title: "Libro 1", price: 25000, stock: 15 },
        { id: 2, title: "Libro 2", price: 15000, stock: 8 },
        { id: 3, title: "Ñibro 3", price: 32000, stock: 18 }
      ];
      setBooks(mockData);
    };
    fetchBooks();
  }, []);

  const handleAdd = () => {
    console.log("Abrir formulario para añadir nuevo libro"); // esto es pa ver que hace
    navigate("/admin/store/books/new"); //esto lo hace
  };

  const handleEdit = (id) => {
    console.log("Editar el libro con ID:", id);
    navigate(`/admin/store/edit/${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de eliminar este libro?");
    if (confirmDelete) {
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);
      console.log("Libro eliminado en la base de datos, ID:", id);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Panel de Administración: Productos</h1>
        
        {/* Botón para Añadir */}
        <button 
          onClick={handleAdd}
          style={{ padding: "10px 15px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          + Añadir Nuevo Libro
        </button>
      </div>

      {/* Tabla de productos */}
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5", textAlign: "left" }}>
            <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>ID</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Título</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Precio</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Stock</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ccc", textAlign: "center" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>{book.id}</td>
              <td style={{ padding: "10px" }}>{book.title}</td>
              <td style={{ padding: "10px" }}>${book.price.toLocaleString("es-CL")}</td>
              <td style={{ padding: "10px" }}>{book.stock}</td>
              <td style={{ padding: "10px", textAlign: "center", display: "flex", justifyContent: "center", gap: "10px" }}>
                
                {/* Botón Editar */}
                <button 
                  onClick={() => handleEdit(book.id)}
                  style={{ padding: "5px 10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}
                >
                  Editar
                </button>

                {/* Botón Eliminar */}
                <button 
                  onClick={() => handleDelete(book.id)}
                  style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "3px", cursor: "pointer" }}
                >
                  Eliminar
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {books.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>No hay productos registrados.</p>
      )}
    </div>
  );
};

export default ProductList;