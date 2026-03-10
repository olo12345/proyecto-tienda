
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";
import { CartContext } from "./../../context/CartContext";
import { useContext } from "react";

export const CardBook = (book) => {
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    const handleAddToCart = (book) => {
        if (!user) {
            navigate("/login");
        } else {
            addToCart(book);
            alert(`¡"${book.title}" añadido al carrito!`);
        }
    };

    return (
        <div
            key={book.id}
            style={{
                border: "1px solid rgba(255, 255, 255, 0.1)", /* Borde sutil transparente */
                backgroundColor: "rgba(20, 22, 31, 0.75)", /* Fondo semitransparente espacial */
                backdropFilter: "blur(5px)", /* Efecto cristal */
                borderRadius: "8px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-cyan)";
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.5)"; /* Sombra más fuerte al elevarse */
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"; /* Vuelve al borde original */
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >

            <div
                onClick={() => navigate(`/store/book/${book.id}`)}
                style={{ textAlign: "center", cursor: "pointer", flex: 1, display: "flex", flexDirection: "column" }}
                title="Ver detalles del libro"
            >
                {/* Contenedor de imagen ajustado con efecto oscuro */}
                <div style={{ width: "100%", height: "200px", backgroundColor: "rgba(0,0,0,0.4)", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <img
                        src={book.img}
                        alt={book.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<span style="color: var(--text-muted)">Foto</span>';
                        }}
                    />
                </div>

                <h3 style={{ fontSize: "1.2rem", margin: "0 0 10px 0", color: "var(--text-light)" }}>{book.title}</h3>
                {/* Precio en tono ámbar */}
                <p style={{ fontSize: "1.3rem", fontWeight: "bold", color: "var(--accent-gold)", marginTop: "auto", paddingBottom: "10px" }}>
                    ${book.price.toLocaleString("es-CL")}
                </p>
            </div>

            <button
                onClick={() => handleAddToCart(book)}
                style={{
                    marginTop: "10px",
                    padding: "12px",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: "var(--accent-cyan)",
                    border: "1px solid var(--accent-cyan)",
                    borderRadius: "4px",
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
                Añadir al Carrito
            </button>

        </div>
    )
}
