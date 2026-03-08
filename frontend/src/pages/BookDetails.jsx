import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/AuthContext";
import { CartContext } from "./../context/CartContext";

function BookDetails() {
  const { id } = useParams(); // Captura el ID de la URL
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    // Simulación de GET /books/:id
    const fetchBookData = () => {
      const mockBooks = [
        { 
          id: "1", 
          title: "Libro 1", 
          description: "Breve descripción bakan", 
          price: 25000, 
          category: "Bakan", 
          stock: 15,
          img: "url_1"
        },
        { 
          id: "2", 
          title: "Libro 2", 
          description: "Otra descripción", 
          price: 15000, 
          category: "Cosas", 
          stock: 8,
          img: "url_2"
        },
        { 
          id: "3", 
          title: "Libro 3", 
          description: "Descripción", 
          price: 32000, 
          category: "Eso", 
          stock: 18,
          img: "url_3"
        }
      ];

      const foundBook = mockBooks.find(b => b.id === id);
      
      if (foundBook) {
        setBook(foundBook);
        // Simulación de GET /reviews (reseñas previas)
        setReviews([
          { id: 101, user_name: "Ana", rating: 5, comment: "Excelente material, muy detallado." }
        ]);
      }
      setLoading(false);
    };

    fetchBookData();
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    // Validación: Solo usuarios logueados pueden comentar
    if (!user) {
      alert("Debes iniciar sesión para dejar una reseña.");
      navigate("/login");
      return;
    }

    // Payload exacto según tu contrato API REST para POST /reviews
    const reviewPayload = {
      book_id: Number(id),
      rating: Number(newReview.rating),
      comment: newReview.comment
    };

    console.log("Enviando reseña al backend:", reviewPayload);
    // Aquí iría: await axios.post('/reviews', reviewPayload, { headers: ... })
    
    // Actualizamos la vista temporalmente simulando el éxito
    setReviews([...reviews, { 
      id: Date.now(), 
      user_name: user.name, 
      rating: reviewPayload.rating, 
      comment: reviewPayload.comment 
    }]);

    setNewReview({ rating: 5, comment: "" });
  };

  const handleAddToCart = () => {
    if (!user) {
      // Si no hay usuario, lanzamos alerta y lo mandamos al login
      alert("Debes iniciar sesión para añadir productos al carrito.");
      navigate("/login");
      return; 
    }

    console.log(`Añadiendo ${book.title} al carrito`);
    addToCart(book);
    alert(`¡"${book.title}" añadido al carrito!`); // Feedback visual como en la gallery
  };

  if (loading) return <div style={{ textAlign: "center", padding: "50px" }}>Cargando detalles...</div>;
  if (!book) return <div style={{ textAlign: "center", padding: "50px" }}>Libro no encontrado.</div>;

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      
      {/* Sección Superior: Detalles del Libro */}
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap", marginBottom: "40px" }}>
        <div style={{ flex: "1", minWidth: "250px" }}>
          <img src={book.img} alt={book.title} style={{ width: "100%", borderRadius: "8px", backgroundColor: "#eee" }} />
        </div>
        
        <div style={{ flex: "2", minWidth: "300px" }}>
          <h1 style={{ marginTop: 0 }}>{book.title}</h1>
          <p style={{ color: "#666", fontWeight: "bold" }}>Categoría: {book.category}</p>
          <p style={{ fontSize: "24px", color: "#d9534f", fontWeight: "bold" }}>
            ${book.price.toLocaleString("es-CL")}
          </p>
          <p style={{ lineHeight: "1.6" }}>{book.description}</p>
          <p><strong>Stock disponible:</strong> {book.stock} unidades</p>
          
          <button 
            onClick={handleAddToCart}
            style={{ padding: "12px 24px", fontSize: "16px", backgroundColor: "#4A90E2", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginTop: "10px" }}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>

      <hr style={{ border: "1px solid #eee", marginBottom: "30px" }} />

      {/* Sección Inferior: Reseñas */}
      <div>
        <h2>Reseñas de los lectores</h2>
        
        {/* Lista de reseñas existentes */}
        <div style={{ marginBottom: "30px" }}>
          {reviews.length === 0 ? (
            <p style={{ color: "#666" }}>Aún no hay reseñas. ¡Sé el primero en opinar!</p>
          ) : (
            reviews.map(review => (
              <div key={review.id} style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "8px", marginBottom: "15px", backgroundColor: "#fefefe" }}>
                <p style={{ margin: "0 0 10px 0" }}>
                  <strong>{review.user_name}</strong> - {"⭐".repeat(review.rating)}
                </p>
                <p style={{ margin: 0 }}>{review.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Formulario para nueva reseña */}
        <div style={{ backgroundColor: "#f9f9f9", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
          <h3>Deja tu reseña</h3>
          {!user ? (
            <p>Por favor, <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", color: "#4A90E2", textDecoration: "underline", cursor: "pointer", padding: 0 }}>inicia sesión</button> para comentar.</p>
          ) : (
            <form onSubmit={handleReviewSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Calificación:</label>
                <select 
                  value={newReview.rating} 
                  onChange={(e) => setNewReview({...newReview, rating: e.target.value})}
                  style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                >
                  <option value={5}>5 - Excelente</option>
                  <option value={4}>4 - Muy Bueno</option>
                  <option value={3}>3 - Bueno</option>
                  <option value={2}>2 - Regular</option>
                  <option value={1}>1 - Malo</option>
                </select>
              </div>
              
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Comentario:</label>
                <textarea 
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  required
                  rows="4"
                  style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
                  placeholder="¿Qué te pareció este libro?"
                />
              </div>

              <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Enviar Reseña
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );
}

export default BookDetails;