import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";
import { CartContext } from "./../../context/CartContext";
import { useContext } from "react";

export const CardBook = ({ id, title, price, img, rating }) => {
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);

    const handleAddToCart = () => {
        if (!user) {
            alert("Debes iniciar sesión para añadir productos al carrito.");
            navigate("/login");
        } else {
            addToCart({
                libro_id: id, 
                libro_titulo: title, 
                libro_precio: price, 
                libro_imagen: img
            });
            alert(`¡"${title}" añadido al carrito!`);
        }
    };

    return (
        <div
            style={cardStyle}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-cyan)";
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.5)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
            }}
        >
            <div
                onClick={() => navigate(`/store/book/${id}`)}
                style={contentContainerStyle}
                title="Ver detalles del libro"
            >
                {/* Contenedor de imagen  */}
                <div style={imgWrapperStyle}>
                    <img
                        src={img}
                        alt={title}
                        style={imgStyle}
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<span style="color: var(--text-muted)">Sin Foto</span>';
                        }}
                    />
                </div>

                <h3 style={titleStyle}>{title}</h3>
                
                <p style={priceStyle}>
                    ${Number(price).toLocaleString("es-CL")}
                </p>
                
                {/* Estrellas dinámicas */}
                <p style={{ margin: 0, padding: 0, color: "var(--accent-gold)" }}>
                    {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}
                </p>
            </div>

            <button
                onClick={handleAddToCart}
                style={btnStyle}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--accent-cyan)";
                    e.currentTarget.style.color = "var(--bg-space)";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--accent-cyan)";
                }}
            >
                Añadir
            </button>
        </div>
    );
};

// ESTILOS
const cardStyle = {
    border: "1px solid rgba(255, 255, 255, 0.1)",
    backgroundColor: "rgba(20, 22, 31, 0.75)",
    backdropFilter: "blur(5px)",
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "all 0.3s ease",
    height: "100%" // Para que todas las tarjetas midan lo mismo
};

const contentContainerStyle = { textAlign: "center", cursor: "pointer", flex: 1, display: "flex", flexDirection: "column" };

const imgWrapperStyle = { 
    width: "100%", height: "200px", backgroundColor: "rgba(0,0,0,0.4)", 
    borderRadius: "4px", border: "1px solid rgba(255,255,255,0.05)", 
    marginBottom: "15px", display: "flex", alignItems: "center", 
    justifyContent: "center", overflow: "hidden" 
};

const imgStyle = { width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 };

const titleStyle = { fontSize: "1.1rem", margin: "0 0 10px 0", color: "var(--text-light)", minHeight: "2.4em", display: "flex", alignItems: "center", justifyContent: "center" };

const priceStyle = { fontSize: "1.2rem", fontWeight: "bold", color: "var(--accent-gold)", marginTop: "auto", paddingBottom: "10px" };

const btnStyle = {
    marginTop: "10px", padding: "10px", cursor: "pointer", backgroundColor: "transparent",
    color: "var(--accent-cyan)", border: "1px solid var(--accent-cyan)", borderRadius: "4px",
    fontWeight: "bold", textTransform: "uppercase", transition: "all 0.2s ease"
};