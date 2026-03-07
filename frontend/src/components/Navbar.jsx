import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./../context/AuthContext";

function Navbar() {

  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{display:"flex", gap:"15px", padding:"10px", borderBottom:"1px solid #ccc"}}>

      <NavLink to="/">Proyecto Tienda</NavLink>

      {!user && (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Registro</NavLink>
        </>
      )}

      {user && (
        <>
          <span>Bienvenido {user.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      )}

    </nav>
  );
}

export default Navbar;