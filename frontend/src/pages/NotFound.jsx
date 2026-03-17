import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "80vh", 
      backgroundColor: "var(--bg-space)", 
      textAlign: "center",
      padding: "20px"
    }}>
      
      {/* El 404 gigante con efecto neón */}
      <h1 className="title-outline" style={{ 
        fontSize: "8rem", 
        color: "var(--accent-cyan)", 
        margin: "0 0 10px 0", 
        letterSpacing: "5px",
        textShadow: "0 0 30px rgba(0, 229, 255, 0.4)",
        lineHeight: "1"
      }}>
        404
      </h1>
      
      {/* Tu texto original estilizado */}
      <p style={{ 
        fontSize: "1.5rem", 
        color: "var(--text-muted)", 
        textTransform: "uppercase", 
        letterSpacing: "2px", 
        marginBottom: "40px",
        fontWeight: "bold"
      }}>
        Error 404, no encontrado
      </p>

      {/* Botón de rescate para volver al inicio */}
      <Link 
        to="/" 
        style={{ 
          padding: "15px 30px", 
          backgroundColor: "transparent", 
          color: "var(--accent-cyan)", 
          border: "1px solid var(--accent-cyan)", 
          borderRadius: "4px", 
          textDecoration: "none",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "2px",
          transition: "all 0.3s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--accent-cyan)";
          e.currentTarget.style.color = "var(--bg-space)";
          e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 229, 255, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "var(--accent-cyan)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        Volver a la base
      </Link>
      
    </div>
  )
}

export default NotFound;