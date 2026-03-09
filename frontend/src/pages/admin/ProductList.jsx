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
    <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto", color: "var(--text-light)", minHeight: "80vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "15px" }}>
        <h1 style={{ color: "var(--accent-gold)", letterSpacing: "1px", margin: 0, fontSize: "1.8rem" }}>
          Panel de Administración: Productos
        </h1>
        
        {/* Botón para Añadir */}
        <button 
          onClick={handleAdd}
          style={{ 
            padding: "12px 20px", 
            backgroundColor: "var(--accent-cyan)", 
            color: "var(--bg-space)", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
            transition: "box-shadow 0.2s ease, transform 0.2s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 229, 255, 0.4)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          + Añadir Nuevo Libro
        </button>
      </div>

      {/* Contenedor tipo tarjeta para la tabla */}
      <div style={{ 
        backgroundColor: "var(--bg-card)", 
        borderRadius: "8px", 
        border: "1px solid var(--bg-border)",
        overflowX: "auto", /* Para que no se rompa en pantallas pequeñas */
        boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
      }}>
        {/* Tabla de productos */}
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "var(--bg-space)", textAlign: "left" }}>
              <th style={{ padding: "15px", borderBottom: "1px solid var(--bg-border)", color: "var(--text-muted)", fontWeight: "bold" }}>ID</th>
              <th style={{ padding: "15px", borderBottom: "1px solid var(--bg-border)", color: "var(--text-muted)", fontWeight: "bold" }}>Título</th>
              <th style={{ padding: "15px", borderBottom: "1px solid var(--bg-border)", color: "var(--text-muted)", fontWeight: "bold" }}>Precio</th>
              <th style={{ padding: "15px", borderBottom: "1px solid var(--bg-border)", color: "var(--text-muted)", fontWeight: "bold" }}>Stock</th>
              <th style={{ padding: "15px", borderBottom: "1px solid var(--bg-border)", color: "var(--text-muted)", fontWeight: "bold", textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} style={{ borderBottom: "1px solid var(--bg-border)", transition: "background-color 0.2s ease" }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.02)"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
              >
                <td style={{ padding: "15px", color: "var(--text-muted)" }}>{book.id}</td>
                <td style={{ padding: "15px", fontWeight: "bold" }}>{book.title}</td>
                <td style={{ padding: "15px", color: "var(--accent-gold)" }}>${book.price.toLocaleString("es-CL")}</td>
                <td style={{ padding: "15px", color: "var(--text-light)" }}>{book.stock}</td>
                <td style={{ padding: "15px", textAlign: "center", display: "flex", justifyContent: "center", gap: "10px" }}>
                  
                  {/* Botón Editar */}
                  <button 
                    onClick={() => handleEdit(book.id)}
                    style={{ 
                      padding: "6px 12px", 
                      backgroundColor: "transparent", 
                      color: "var(--accent-cyan)", 
                      border: "1px solid var(--accent-cyan)", 
                      borderRadius: "4px", 
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--accent-cyan)";
                      e.currentTarget.style.color = "var(--bg-space)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--accent-cyan)";
                    }}
                  >
                    Editar
                  </button>

                  {/* Botón Eliminar */}
                  <button 
                    onClick={() => handleDelete(book.id)}
                    style={{ 
                      padding: "6px 12px", 
                      backgroundColor: "transparent", 
                      color: "var(--accent-danger)", 
                      border: "1px solid var(--accent-danger)", 
                      borderRadius: "4px", 
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "all 0.2s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--accent-danger)";
                      e.currentTarget.style.color = "var(--text-light)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "var(--accent-danger)";
                    }}
                  >
                    Eliminar
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {books.length === 0 && (
          <p style={{ textAlign: "center", padding: "30px", margin: 0, color: "var(--text-muted)" }}>No hay productos registrados.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;