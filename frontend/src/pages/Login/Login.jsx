import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "./../../context/AuthContext"

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // agregamos esto para limpiar el error

    const result = await login(formData.email, formData.password);

    if (result.success) {
      console.log("Login exitoso, redirigiendo...");
      navigate("/store"); 
    } else {
      setError(result.error || "Error al iniciar sesión");
    }
  };


  return (
    <div style={{ padding: "40px 20px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      
      <div style={{ 
        width: "100%", 
        maxWidth: "400px", 
        backgroundColor: "var(--bg-card)", 
        padding: "40px 30px", 
        borderRadius: "8px", 
        border: "1px solid var(--bg-border)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.5)"
      }}>
        
        <h1 style={{ textAlign: "center", color: "var(--accent-cyan)", marginBottom: "30px", fontSize: "2rem", letterSpacing: "1px" }}>
          Iniciar Sesión
        </h1>

        {/* Renderizado condicional del error estilizado para dark mode */}
        {error && (
          <div style={{ 
            backgroundColor: "rgba(255, 75, 75, 0.1)", 
            color: "var(--accent-danger)", 
            border: "1px solid var(--accent-danger)",
            padding: "12px", 
            borderRadius: "4px", 
            marginBottom: "20px", 
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "0.9rem"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", color: "var(--text-muted)", fontWeight: "bold", fontSize: "0.9rem" }}>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              style={{ 
                width: "100%", 
                padding: "12px", 
                marginTop: "8px", 
                boxSizing: "border-box",
                backgroundColor: "var(--bg-space)",
                border: "1px solid var(--bg-border)",
                color: "var(--text-light)",
                borderRadius: "4px",
                outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent-cyan)"}
              onBlur={(e) => e.target.style.borderColor = "var(--bg-border)"}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ display: "block", color: "var(--text-muted)", fontWeight: "bold", fontSize: "0.9rem" }}>Contraseña:</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              style={{ 
                width: "100%", 
                padding: "12px", 
                marginTop: "8px", 
                boxSizing: "border-box",
                backgroundColor: "var(--bg-space)",
                border: "1px solid var(--bg-border)",
                color: "var(--text-light)",
                borderRadius: "4px",
                outline: "none"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent-cyan)"}
              onBlur={(e) => e.target.style.borderColor = "var(--bg-border)"}
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              width: "100%", 
              padding: "14px", 
              cursor: "pointer", 
              backgroundColor: "transparent", 
              color: "var(--accent-cyan)", 
              border: "1px solid var(--accent-cyan)", 
              borderRadius: "4px",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "2px",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--accent-cyan)";
              e.currentTarget.style.color = "var(--bg-space)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 229, 255, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--accent-cyan)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Ingresar
          </button>

        </form>
      </div>
      
    </div>
  );
}

export default Login;