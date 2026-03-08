import { useContext, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "./../context/AuthContext";

function Navbar() {

  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");        /* Pendiente con ver como conectar esto*/

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log("Filtrando:", e.target.value);
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
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </>
      )}

      {user && (
        <>
          <span>Bienvenido {user.name}</span>
          <NavLink to="/Cart">Carrito</NavLink> {/* Carrito queda visible sólo cuando el usuario hizo ligin*/}
          <button onClick={logout}>Logout</button>
        </>
      )}

    </nav>
  );
}

export default Navbar;