import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom"

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Sugerido: pequeña validación visual por si los datos tardan una fracción de segundo en cargar
  if (!user) {
    return <div style={{ textAlign: "center", padding: "20px" }}>Cargando perfil...</div>;
  }

  const handleLogout = () => {
    logout();
    window.location.href = "/"; // tuvimos que colocar esto para evitar conflictos con el protectedroute que nos expulsaba antes de nosotros redirigir
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ borderBottom: "2px solid #eee", paddingBottom: "10px" }}>Mi Perfil</h1>
      
      {/* Datos del usuario */}
      <div style={{ 
        border: "1px solid #ccc", 
        borderRadius: "8px", 
        padding: "20px", 
        marginTop: "20px",
        backgroundColor: "#fefefe"
      }}>
        <h2 style={{ marginTop: 0, color: "#333" }}>Datos Personales</h2>
        
        <p style={{ fontSize: "16px", marginBottom: "10px" }}>
          <strong>Nombre:</strong> {user.name}
        </p>
        <p style={{ fontSize: "16px", marginBottom: "10px" }}>
          <strong>Email:</strong> {user.email}
        </p>
        
        {user.age && (
          <p style={{ fontSize: "16px", marginBottom: "10px" }}>
            <strong>Edad:</strong> {user.age} años
          </p>
        )}

        <p style={{ fontSize: "16px", marginBottom: "10px", textTransform: "capitalize" }}>
          <strong>Rol de cuenta:</strong> {user.rol}
        </p>
      </div>

      <div style={{ marginTop: "30px", textAlign: "right" }}>
        <button 
          onClick={handleLogout}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#dc3545", 
            color: "white", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default Profile;