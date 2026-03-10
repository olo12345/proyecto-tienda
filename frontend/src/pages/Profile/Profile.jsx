import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  console.log("Datos del usuario en Profile.jsx:", user); // Agregado para depuración
  // Sugerido: pequeña validación visual por si los datos tardan una fracción de segundo en cargar
  if (!user) {
    return <div style={{ textAlign: "center", padding: "50px", color: "var(--text-light)" }}>Cargando perfil...</div>;
  }

  const handleLogout = () => {
    logout();
    window.location.href = "/"; // tuvimos que colocar esto para evitar conflictos con el protectedroute que nos expulsaba antes de nosotros redirigir
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto", color: "var(--text-light)", minHeight: "80vh" }}>
      <h1 style={{ borderBottom: "1px solid var(--bg-border)", paddingBottom: "15px", color: "var(--accent-cyan)", letterSpacing: "1px", fontSize: "2.5rem", textTransform: "uppercase" }}>
        Mi Perfil
      </h1>

      {/* Datos del usuario */}
      <div style={{
        border: "1px solid var(--bg-border)",
        borderRadius: "8px",
        padding: "30px",
        marginTop: "30px",
        backgroundColor: "var(--bg-card)",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
      }}>
        <h2 style={{ marginTop: 0, color: "var(--accent-gold)", marginBottom: "25px", fontSize: "1.5rem", letterSpacing: "1px" }}>
          Datos Personales
        </h2>

        <p style={{ fontSize: "16px", marginBottom: "15px", color: "var(--text-light)" }}>
          <strong style={{ color: "var(--text-muted)", display: "inline-block", width: "130px" }}>Nombre:</strong> {user.name}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "15px", color: "var(--text-light)" }}>
          <strong style={{ color: "var(--text-muted)", display: "inline-block", width: "130px" }}>Email:</strong> {user.email}
        </p>

        {user.age && (
          <p style={{ fontSize: "16px", marginBottom: "15px", color: "var(--text-light)" }}>
            <strong style={{ color: "var(--text-muted)", display: "inline-block", width: "130px" }}>Edad:</strong> {user.age} años
          </p>
        )}

        <p style={{ fontSize: "16px", marginBottom: "10px", textTransform: "capitalize", color: "var(--text-light)" }}>
          <strong style={{ color: "var(--text-muted)", display: "inline-block", width: "130px" }}>Rol de cuenta:</strong> {user.role}
        </p>
      </div>

      <div style={{ marginTop: "40px", textAlign: "right" }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "12px 24px",
            backgroundColor: "transparent",
            color: "var(--accent-danger)",
            border: "1px solid var(--accent-danger)",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--accent-danger)";
            e.currentTarget.style.color = "var(--text-light)";
            e.currentTarget.style.boxShadow = "0 0 10px rgba(255, 75, 75, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--accent-danger)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Profile;