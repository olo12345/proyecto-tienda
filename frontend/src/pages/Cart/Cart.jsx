import { useState } from "react";
import {useCart} from "./../../hooks/useCart"
import { apiProducts } from "../../services/api";

function Cart() {
  const { cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const increase = (id, count) => updateQuantity(id, count + 1)
  const decrease = (id, count) => count === 1 ? removeFromCart(id) :updateQuantity(id, count - 1)


  const handleCheckout = async () => {
    try {
      // Rescatamos el token (hay que ubicarlo primero :|)
      const token = localStorage.getItem("token"); // esta en el localstorage (ubicado en el api.js)

      if (!token) {
        setMessage("Debes iniciar sesión para poder comprar");
        setShowConfirm(true);
        return;
      }

      // Adaptamos para conectar con el back
      // se espera "id" y "cantidad"
      const formattedCart = cart.map((book) => ({
        id: book.id,
        cantidad: book.quantity // homogeneización de quantity a cantidad despue´s de error de comunicación
      }));

      // Petición a la API
      const res = await apiProducts.post("/checkouts", formattedCart);

      setMessage(`Pedido enviado correctamente! Orden N°: ${res.data.orden_id}`);
      setShowConfirm(true);

    } catch (error) {
      console.error("Error en el checkout:", error);
      setMessage("Error de conexión con el servidor");
      setShowConfirm(true);
    }
  };

  const handleConfirm = () => {
    if (clearCart) {
      clearCart();
    }
    setMessage("");
    setShowConfirm(false);
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto", color: "var(--text-light)", minHeight: "80vh" }}>
      <h2 style={{ color: "var(--accent-cyan)", letterSpacing: "1px", fontSize: "2.5rem", textTransform: "uppercase", borderBottom: "1px solid var(--bg-border)", paddingBottom: "15px", marginBottom: "30px" }}>
        🛒 Carrito
      </h2>

      {cart.length === 0 ? (
        <div style={{
          backgroundColor: "var(--bg-card)",
          padding: "40px",
          borderRadius: "8px",
          border: "1px solid var(--bg-border)",
          textAlign: "center"
        }}>
          <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", margin: 0 }}>El carrito está vacío.</p>
        </div>
      ) : (
        <div style={{
          backgroundColor: "var(--bg-card)",
          padding: "30px",
          borderRadius: "8px",
          border: "1px solid var(--bg-border)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
        }}>
          {/* Mapeamos los libros */}
          {cart.map((book) => (
            <div key={book.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--bg-border)", paddingBottom: "20px", marginBottom: "20px" }}>

              <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ width: "70px", height: "70px", backgroundColor: "var(--bg-space)", borderRadius: "4px", border: "1px solid var(--bg-border)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={book.img} alt={book.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: "1.1rem", color: "var(--text-light)" }}>{book.title}</h3>
                  <p style={{ margin: 0, color: "var(--accent-gold)", fontWeight: "bold", fontSize: "1.1rem" }}>
                    ${book.price.toLocaleString("es-CL")}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <button
                  onClick={() => decrease(book.id, book.quantity)}
                  style={{ padding: "5px 12px", cursor: "pointer", backgroundColor: "transparent", color: "var(--accent-cyan)", border: "1px solid var(--accent-cyan)", borderRadius: "4px", fontWeight: "bold", transition: "all 0.2s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--accent-cyan)"; e.currentTarget.style.color = "var(--bg-space)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--accent-cyan)"; }}
                >
                  -
                </button>
                <span style={{ fontWeight: "bold", fontSize: "1.2rem", minWidth: "20px", textAlign: "center" }}>{book.quantity}</span>
                <button
                  onClick={() => increase(book.id, book.quantity)}
                  style={{ padding: "5px 12px", cursor: "pointer", backgroundColor: "transparent", color: "var(--accent-cyan)", border: "1px solid var(--accent-cyan)", borderRadius: "4px", fontWeight: "bold", transition: "all 0.2s ease" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--accent-cyan)"; e.currentTarget.style.color = "var(--bg-space)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--accent-cyan)"; }}
                >
                  +
                </button>
              </div>

            </div>
          ))}

          {/* Total */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px", fontSize: "1.5rem", fontWeight: "bold" }}>
            <span style={{ color: "var(--text-light)" }}>Total:</span>
            <span style={{ color: "var(--accent-gold)", textShadow: "0 0 10px rgba(245, 166, 35, 0.2)" }}>
              ${totalPrice.toLocaleString("es-CL")}
            </span>
          </div>

          {/* Botón Pagar */}
          {!showConfirm && (
            <button
              onClick={handleCheckout}
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "30px",
                backgroundColor: "var(--accent-cyan)",
                color: "var(--bg-space)",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "2px",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 229, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Pagar 💳
            </button>
          )}

          {/* Mensaje de feedback */}
          {message && (
            <div style={{
              marginTop: "25px",
              textAlign: "center",
              fontWeight: "bold",
              padding: "20px",
              backgroundColor: "rgba(0, 229, 255, 0.1)",
              border: "1px solid var(--accent-cyan)",
              borderRadius: "4px"
            }}>
              <p style={{ color: "var(--accent-cyan)", fontSize: "1.2rem", margin: "0 0 15px 0" }}>{message}</p>
              {showConfirm && (
                <button
                  onClick={handleConfirm}
                  style={{
                    padding: "10px 30px",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    color: "var(--text-light)",
                    border: "1px solid var(--text-light)",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--text-light)"; e.currentTarget.style.color = "var(--bg-space)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--text-light)"; }}
                >
                  OK
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;