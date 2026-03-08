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
<div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>Iniciar Sesión</h1>

      {/* Renderizado condicional del error */}
      {error && (
        <div style={{ backgroundColor: "#ffe6e6", color: "#d9534f", padding: "10px", borderRadius: "4px", marginBottom: "15px", textAlign: "center" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Contraseña:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            style={{ width: "100%", padding: "8px", marginTop: "5px", boxSizing: "border-box" }}
          />
        </div>

        <button 
          type="submit" 
          style={{ width: "100%", padding: "10px", marginTop: "10px", cursor: "pointer", backgroundColor: "#4A90E2", color: "white", border: "none", borderRadius: "4px" }}
        >
          Ingresar
        </button>

      </form>
      
    </div>
  );
}

export default Login