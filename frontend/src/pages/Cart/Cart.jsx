import { useContext, useState } from "react";
import { CartContext } from "./../../context/CartContext";
import { AuthContext } from "./../../context/AuthContext";

function Cart() {
  const { cart, increase, decrease, total, clearCart } = useContext(CartContext);
  const { user, token } = useContext(AuthContext); // Ahora validamos con 'user' 
  const [message, setMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  

  const handleCheckout = async () => {
    // Simulación rápida de éxito ya que aún no conectamos el backend
    setMessage("✅ Pedido enviado correctamente!");
    setShowConfirm(true);

    /* Lógica preparada para cuando se retomemos el desarrollo en Node.js:
    try {
      const res = await fetch("http://localhost:5001/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,            ------------------->>>>>> aquí dejamos listo para cuando ya podamos usar el back
        },
        body: JSON.stringify({ items: cart, total }),
      });
      // ... manejo de la respuesta
    } catch (error) { ... }
    */
  };

  const handleConfirm = () => {
    if (clearCart) {
      clearCart();
    }
    setMessage("");       
    setShowConfirm(false); 
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>🛒 Carrito</h2>

      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {/* Mapeamos los libros */}
          {cart.map((book) => (
            <div key={book.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #ccc", paddingBottom: "10px", marginBottom: "10px" }}>
              
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <img src={book.img} alt={book.title} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }} />
                <div>
                  <h3 style={{ margin: "0 0 5px 0", fontSize: "16px" }}>{book.title}</h3>
                  <p style={{ margin: 0, color: "#666" }}>
                    ${book.price.toLocaleString("es-CL")}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button onClick={() => decrease(book.id)} style={{ padding: "5px 10px", cursor: "pointer" }}>-</button>
                <span style={{ fontWeight: "bold" }}>{book.count}</span>
                <button onClick={() => increase(book.id)} style={{ padding: "5px 10px", cursor: "pointer" }}>+</button>
              </div>

            </div>
          ))}

          {/* Total */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
            <span>Total:</span>
            <span style={{ color: "#d9534f" }}>
              ${total.toLocaleString("es-CL")}
            </span>
          </div>

          {/* Botón Pagar */}
          {!showConfirm && (
            <button
              disabled={!user}
              onClick={handleCheckout}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "20px",
                backgroundColor: user ? "#4A90E2" : "#ccc",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: user ? "pointer" : "not-allowed"
              }}
            >
              Pagar 💳
            </button>
          )}

          {/* Mensaje de feedback */}
          {message && (
            <div style={{ marginTop: "15px", textAlign: "center", fontWeight: "bold" }}>
              <p>{message}</p>
              {showConfirm && (
                <button onClick={handleConfirm} style={{ marginTop: "10px", padding: "5px 15px", cursor: "pointer", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px" }}>
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