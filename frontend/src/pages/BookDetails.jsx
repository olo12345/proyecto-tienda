import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useBooks } from "./../hooks/useBooks";
// import { getProduct, updateProduct } from "./../services/products";
import { addComment } from "../services/products";

function BookDetails() {
  const { id } = useParams(); // Captura el ID de la URL
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { book, fetchBookByID } = useBooks();

  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchBookByID(id);
        setLoading(false);
      } catch (err) {
        console.error("Error al llamar el libro", err);
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    //Se limpia el la propiedad sizeList para usar como contenedor para reviews, temporal por adaptación de api



    // Validación: Solo usuarios logueados pueden comentar
    if (!user) {
      alert("Debes iniciar sesión para dejar una reseña.");
      navigate("/login");
      return;
    }

    // Payload exacto según tu contrato API REST para POST /reviews
    const reviewPayload = {
      libro_id: id,
      comentario: newReview.comment,
      calificacion: Number(newReview.rating),
      usuario_id: user.id
      // sizeList: Number(newReview.rating),
      // currency: newReview.comment
      // sizeList: [...book.sizeList,
      // {
      //   user_name: user.name,
      //   id: Date.now(), // ID temporal para la review, en un backend real lo asignaría el servidor
      //   rating: Number(newReview.rating),
      //   comment: newReview.comment
      // }]
    };

    try {
      const res = await addComment(reviewPayload);
      if (res) {
        alert("¡Reseña enviada con éxito!");
        setNewReview({ rating: 5, comment: "" });
        fetchBookByID(id); // Recargamos el libro para ver la nueva reseña
      }
    } catch (err) {
      console.error("Error al subir la review", err);
      alert("No se pudo enviar la reseña.");
    }
  };

  //   console.log("Enviando reseña al backend:", reviewPayload);
  //   // Aquí iría: await axios.post('/reviews', reviewPayload, { headers: ... })


  //   // Actualizamos la vista temporalmente simulando el éxito
  //   setReviews([...reviews, {
  //     id: Date.now(),
  //     // user_name: user.name,
  //     // rating: reviewPayload.rating,
  //     // comment: reviewPayload.comment
  //     ...reviewPayload.sizeList[reviewPayload.sizeList.length - 1]
  //   }]);
  //   updateBook(reviewPayload)
  //     .then((res) => {
  //       console.log("Se ha subido la review", res.data)
  //     })

  //   setNewReview({ rating: 5, comment: "" });
  // };

  const handleAddToCart = () => {
    if (!user) {
      // Si no hay usuario, lanzamos alerta y lo mandamos al login
      alert("Debes iniciar sesión para añadir productos al carrito.");
      navigate("/login");
      return;
    }

    console.log(`Añadiendo ${book.libro_titulo} al carrito`);
    addToCart(book);
    alert(`¡"${book.libro_titulo}" añadido al carrito!`); // Feedback visual como en la gallery
  };

  if (loading) return <div style={{ textAlign: "center", padding: "50px", color: "var(--text-light)" }}>Cargando detalles...</div>;
  if (!book || !book.libro_titulo) return <div style={{ textAlign: "center", padding: "50px", color: "var(--text-light)" }}>Libro no encontrado.</div>;

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto", color: "var(--text-light)" }}>

      {/* Sección Superior: Detalles del Libro */}
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", marginBottom: "50px" }}>

        {/* Contenedor de la imagen */}
        <div style={{ flex: "1", minWidth: "300px" }}>
          <div style={{
            width: "100%",
            height: "400px",
            backgroundColor: "var(--bg-card)",
            borderRadius: "8px",
            border: "1px solid var(--bg-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}>
            <img
              src={book.libro_imagen}
              alt={book.libro_titulo}
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<span style="color: var(--text-muted)">Foto del Producto</span>';
              }}
            />
          </div>
        </div>

        {/* Detalles del producto */}
        <div style={{ flex: "1.5", minWidth: "300px", display: "flex", flexDirection: "column" }}>
          <h1 style={titleStyle}>{book.libro_titulo}</h1>
          <p style={categoryStyle}>Autor: {book.libro_autor}</p>
          <p style={priceStyle}>${Number(book.libro_precio).toLocaleString("es-CL")}</p>
          <p style={descriptionStyle}>{book.libro_descripcion}</p>
          <p style={{ color: "var(--text-muted)", marginBottom: "30px" }}>
            <strong>Stock:</strong> {book.libro_stock} unidades
          </p>

          <button
            onClick={handleAddToCart}
            style={{
              padding: "15px 30px",
              fontSize: "1.1rem",
              backgroundColor: "var(--accent-cyan)",
              color: "var(--bg-space)",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginTop: "auto",
              alignSelf: "flex-start",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 229, 255, 0.4)"}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>

      <hr style={{ border: "0", borderTop: "1px solid var(--bg-border)", marginBottom: "40px" }} />

      {/* Sección Inferior: Reseñas */}
      <div>
        <h2 style={{ color: "var(--text-light)", marginBottom: "20px" }}>Reseñas de los lectores</h2>

        {/* Lista de reseñas existentes */}
        <div style={{ marginBottom: "40px" }}>
          {!book.comentarios || book.comentarios.length === 0 ? (
            <p style={{ color: "var(--text-muted)" }}>Aún no hay reseñas. ¡Sé el primero en opinar!</p>
          ) : (
            reviews.map(review => (
              <div key={review.id} style={{
                border: "1px solid var(--bg-border)",
                padding: "20px",
                borderRadius: "8px",
                marginBottom: "15px",
                backgroundColor: "var(--bg-card)"
              }}>
                <p style={{ margin: "0 0 10px 0", color: "var(--accent-cyan)" }}>
                  <strong>{review.user_name}</strong> <span style={{ color: "var(--text-muted)", marginLeft: "10px" }}>{"⭐".repeat(comment.comentario_calificacion)}</span>
                </p>
                <p style={{ margin: 0, color: "var(--text-light)", lineHeight: "1.6" }}>{comment.comentario_texto}</p>
              </div>
            ))
          )}
        </div>

        {/* Formulario para nueva reseña */}
        <div style={{
          backgroundColor: "var(--bg-card)",
          padding: "30px",
          borderRadius: "8px",
          border: "1px solid var(--bg-border)"
        }}>
          <h3 style={{ color: "var(--accent-gold)", marginBottom: "20px" }}>Deja tu reseña</h3>
          {!user ? (
            <p style={{ color: "var(--text-muted)" }}>
              Por favor, <button onClick={() => navigate("/login")} style={{ background: "none", border: "none", color: "var(--accent-cyan)", textDecoration: "underline", cursor: "pointer", padding: 0, fontSize: "1rem" }}>inicia sesión</button> para comentar.
            </p>
          ) : (
            <form onSubmit={handleReviewSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", color: "var(--text-muted)", fontWeight: "bold" }}>Calificación:</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  style={{
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid var(--bg-border)",
                    backgroundColor: "var(--bg-space)",
                    color: "var(--text-light)",
                    width: "100%",
                    maxWidth: "200px",
                    outline: "none"
                  }}
                >
                  <option value={5}>5 - Excelente</option>
                  <option value={4}>4 - Muy Bueno</option>
                  <option value={3}>3 - Bueno</option>
                  <option value={2}>2 - Regular</option>
                  <option value={1}>1 - Malo</option>
                </select>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", color: "var(--text-muted)", fontWeight: "bold" }}>Comentario:</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  required
                  rows="4"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "4px",
                    border: "1px solid var(--bg-border)",
                    backgroundColor: "var(--bg-space)",
                    color: "var(--text-light)",
                    boxSizing: "border-box",
                    outline: "none",
                    resize: "vertical"
                  }}
                  placeholder="¿Qué te pareció este libro?"
                />
              </div>

              <button type="submit" style={{
                padding: "12px 24px",
                backgroundColor: "transparent",
                color: "var(--accent-cyan)",
                border: "1px solid var(--accent-cyan)",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                textTransform: "uppercase",
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