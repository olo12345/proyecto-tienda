import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "./../context/AuthContext";
import { CartContext } from "./../context/CartContext"; // Esto para mostrar el contexto del carrito

function Navbar() {

  const { user, logout } = useContext(AuthContext);
  const { total } = useContext(CartContext); // Esto para ver lo que tiene el carrito
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");        /* Pendiente con ver como conectar esto*/

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log("Filtrando:", e.target.value);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/"; // tuvimos que colocar esto para evitar conflictos con el protectedroute que nos expulsaba antes de nosotros redirigir
  };

  // Estilo base para los enlaces de navegación comunes
  const navLinkStyle = { color: "var(--text-light)", textDecoration: "none" };

  if (location.pathname === "/register" || location.pathname === "/login") {
    return (
      <nav style={{ display: "flex", padding: "15px 20px", borderBottom: "1px solid var(--bg-border)", backgroundColor: "var(--bg-space)", alignItems: "center" }}>
        <NavLink to="/" style={{ fontFamily: "'The Foregen', sans-serif", color: "var(--accent-cyan)", textDecoration: "none", fontSize: "1.5rem", letterSpacing: "1px", textTransform: "uppercase" }}>The Passenger Books</NavLink>
      </nav>
    );
  }

 

  return (
    <nav style={{display:"flex", gap:"20px", padding:"15px 20px", borderBottom:"1px solid var(--bg-border)", backgroundColor: "var(--bg-space)", alignItems: "center"}}>

      <NavLink to="/" style={{ fontFamily: "'The Foregen', sans-serif", color: "var(--accent-cyan)", textDecoration: "none", fontSize: "1.5rem", letterSpacing: "1px", textTransform: "uppercase", whiteSpace: "nowrap" }}>The Passenger Books</NavLink>

      <div style={{ position: "relative", flex: "1", maxWidth: "400px", display: "flex", alignItems: "center", marginLeft: "20px" }}>
      <span style={{ position: "absolute", left: "12px", color: "var(--text-muted)" }}>🔍</span>
      <input 
      type="text" 
      placeholder="Search..." 
      value={searchTerm}                                  /* Pendiente con ver como conectar esto*/
      onChange={handleSearch} 
      style={{
      width: "100%",
      padding: "8px 12px 8px 35px",
      borderRadius: "20px", 
      border: "1px solid var(--bg-border)",
      backgroundColor: "var(--bg-card)",
      color: "var(--text-light)",
      outline: "none",
      fontSize: "14px"
      }}
      />
      </div>

      {!user && (
        <>
          <NavLink to="/store" style={navLinkStyle}>Tienda</NavLink>
          <NavLink to="/login" style={navLinkStyle}>Login</NavLink>
          <NavLink to="/register" style={navLinkStyle}>Register</NavLink>
        </>
      )}

      {user && (
        <>
          <span style={{ color: "var(--text-muted)" }}>Bienvenido {user.name}</span>

          {(user.rol === "admin" || user.role === "admin") && (           /* Aquí soportamos lo que tenemos en el mock ocmo en la futura DB*/
          <NavLink 
          to="/admin/store" 
          style={{ color: "var(--accent-gold)", fontWeight: "bold", textDecoration: "none" }}
          >
          ⚙️ Panel Admin
          </NavLink>
          )}
          <NavLink to="/store" style={navLinkStyle}>Tienda</NavLink>
          <NavLink to="/Profile" style={navLinkStyle}>Perfil</NavLink>
          <NavLink                                                      /* Carrito queda visible sólo cuando el usuario hizo ligin*/
            to="/Cart" 
            style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "var(--text-light)" }}
          >
            🛒 Carrito 
            <span style={{ 
              backgroundColor: "var(--accent-cyan)", 
              padding: "2px 8px", 
              borderRadius: "12px", 
              border: "none", 
              fontSize: "14px", 
              color: "var(--bg-space)",
              fontWeight: "bold"
            }}>
              ${total.toLocaleString("es-CL")}
            </span>
          </NavLink> 

          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: "transparent",
              color: "var(--accent-danger)",
              border: "1px solid var(--accent-danger)",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              marginLeft: "auto" /* Empuja el botón a la derecha si hay espacio */
            }}
          >
            Logout
          </button>
        </>
      )}

    </nav>
  );
}

export default Navbar;