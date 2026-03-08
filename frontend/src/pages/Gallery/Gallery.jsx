import { useState, useEffect, useContext } from "react"; // agregamos useContext para el carrito despues
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";
import { CartContext } from "./../../context/CartContext";

function Gallery() {

  const { user } = useContext(AuthContext); //para saber si el usuario está logueado o no
  const navigate = useNavigate(); // para llevanos a log in si el usuario no está logueado
  const { addToCart } = useContext(CartContext);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = () => {
      const mockData = [ // por mientras
        { id: 1, title: "Libro 1", price: 25000, img: "url_1" },
        { id: 2, title: "Libro 2", price: 15000, img: "url_2" },
        { id: 3, title: "Libro 3", price: 32000, img: "url_3" },
        { id: 4, title: "Libro 4", price: 18000, img: "url_4" },
        { id: 5, title: "Libro 5", price: 21000, img: "url_5" }
      ];
      setBooks(mockData); // cambiar aqyi tambien cuadno tenga para el fetch
    };

    fetchBooks();
  }, []);

  const handleAddToCart = (book) => {
    if (!user) {
      navigate("/login");
    } else {
      addToCart(book); 
      alert(`¡"${book.title}" añadido al carrito!`); 
    }
  };

  return (
    <div style={{ padding: "20px" }}>
    <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Tienda</h1>

    {/* Tarjetas */}
    <div style={{ 
      display: "grid", 
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", 
      gap: "20px" 
    }}>
      
      {/* Tarjeta por cada libro */}
      {books.map((book) => (
        <div key={book.id} style={{ 
          border: "1px solid #ccc", 
          borderRadius: "8px", 
          padding: "15px", 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "space-between" 
        }}>
          
          <div 
            onClick={() => navigate(`/store/book/${book.id}`)} 
            style={{ textAlign: "center", cursor: "pointer" }}
            title="Ver detalles del libro"
          >
            <img 
              src={book.img} 
              alt={book.title} 
              style={{ width: "100%", height: "auto", marginBottom: "15px", backgroundColor: "#eee" }} 
            />
            
            <h3 style={{ fontSize: "16px", margin: "0 0 10px 0", color: "#4A90E2" }}>{book.title}</h3>
            <p style={{ fontSize: "18px", fontWeight: "bold", color: "#333" }}>
              ${book.price.toLocaleString("es-CL")}
            </p>
          </div>

          <button 
              onClick={() => handleAddToCart(book)} 
              style={{ marginTop: "15px", padding: "10px", cursor: "pointer", backgroundColor: "#f5f5f5", border: "1px solid #ccc", borderRadius: "4px" }}
            >
              Añadir al Carrito
            </button>

        </div>
      ))}

    </div>
  </div>
);
}

export default Gallery