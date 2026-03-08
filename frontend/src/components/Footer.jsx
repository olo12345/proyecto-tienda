import { useLocation } from "react-router-dom";

function Footer() {

  const location = useLocation();
  const path = location.pathname;

  let layoutMessage = "";

  if (path === "/" || path === "/login" || path === "/register" || path === "/Store") {
    layoutMessage = "Public Layout";
  } else if (path === "/profile" || path === "/Cart") {
    layoutMessage = "User Layout";
  } else if (path === "/ProductList") {
    layoutMessage = "Admin Layout";
  }

  // No olvidar probar con las vistas protegidas

  return (
<footer aria-label="Pie de página" className="bg-gray-900 text-gray-200 py-4" style={{ borderTop: "1px solid #ccc", marginTop: "20px" }}>
      <div className="max-w-7xl mx-auto px-4 text-center">
        
        {/* Mensaje dinamiquo aquí */}
        {layoutMessage && (
          <p style={{ fontWeight: "bold", marginBottom: "5px", color: "#4A90E2" }}>
            {layoutMessage}
          </p>
        )}

        <p className="text-sm">
          © 2026 - The Passenger Books - Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}

export default Footer;