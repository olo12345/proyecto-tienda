import { useLocation } from "react-router-dom";

function Footer() {

  const location = useLocation();
  const path = location.pathname;

  let layoutMessage = "";

  if (path === "/" || path === "/login" || path === "/register" || path === "/store") {
    layoutMessage = "Public Layout";
  } else if (path === "/Profile" || path === "/Cart" || path === "/BookDetails/:id") {
    layoutMessage = "User Layout";
  } else if (path === "/admin/store" || path === "/CreatePost" || path === "/EditPost/:id") {
    layoutMessage = "Admin Layout";
  }

  // No olvidar probar con las vistas protegidas

  return (
    <footer 
      aria-label="Pie de página" 
      style={{ 
        backgroundColor: "var(--bg-card)", /* Usamos el color de tarjeta para darle un leve contraste contra el fondo */
        color: "var(--text-muted)", 
        padding: "20px 0", 
        borderTop: "1px solid var(--bg-border)", 
        marginTop: "auto" 
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
        
        {/* Mensaje dinamiquo aquí */}
        {layoutMessage && (
          <p style={{ fontWeight: "bold", marginBottom: "10px", color: "var(--accent-cyan)", letterSpacing: "1px" }}>
            {layoutMessage}
          </p>
        )}

        <p style={{ fontSize: "14px", margin: 0 }}>
          © 2026 - The Passenger Books - Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}

export default Footer;