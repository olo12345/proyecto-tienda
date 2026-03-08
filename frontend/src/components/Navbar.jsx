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

  if (location.pathname === "/register" || location.pathname === "/login") {
    return (
      <nav style={{ display: "flex", padding: "10px", borderBottom: "1px solid #ccc" }}>
        <NavLink to="/">The Passenger Books</NavLink>
      </nav>
    );
  }

 

  return (
    <nav style={{display:"flex", gap:"15px", padding:"10px", borderBottom:"1px solid #ccc"}}>

      <NavLink to="/">The Passenger Books</NavLink>

      <div style={{ position: "relative", flex: "1", maxWidth: "400px", display: "flex", alignItems: "center", marginLeft: "20px" }}>
      <span style={{ position: "absolute", left: "12px", color: "#888" }}>🔍</span>
      <input 
      type="text" 
      placeholder="Search..." 
      value={searchTerm}                                  /* Pendiente con ver como conectar esto*/
      onChange={handleSearch} 
      style={{
      width: "100%",
      padding: "8px 12px 8px 35px",
      borderRadius: "20px", 
      border: "1px solid #ccc",
      outline: "none",
      fontSize: "14px"
      }}
      />
      </div>

      {!user && (
        <>
          <NavLink to="/store">Tienda</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}

      {user && (
        <>
          <span>Bienvenido {user.name}</span>

          {(user.rol === "admin" || user.role === "admin") && (           /* Aquí soportamos lo que tenemos en el mock ocmo en la futura DB*/
          <NavLink 
          to="/admin/store" 
          style={{ color: "orange", fontWeight: "bold", textDecoration: "none" }}
          >
          ⚙️ Panel Admin
          </NavLink>
          )}
          <NavLink to="/store">Tienda</NavLink>
          <NavLink to="/Profile">Perfil</NavLink>
          <NavLink                                                      /* Carrito queda visible sólo cuando el usuario hizo ligin*/
            to="/Cart" 
            style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
          >
            🛒 Carrito 
            <span style={{ 
              backgroundColor: "#f5f5f5", 
              padding: "2px 8px", 
              borderRadius: "12px", 
              border: "1px solid #ccc", 
              fontSize: "14px", 
              color: "#333",
              fontWeight: "bold"
            }}>
              ${total.toLocaleString("es-CL")}
            </span>
          </NavLink> 

          <button onClick={handleLogout}>Logout</button>
        </>
      )}

    </nav>
  );
}

export default Navbar;