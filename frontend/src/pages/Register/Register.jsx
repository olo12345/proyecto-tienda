import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/AuthContext";
import { createUser } from "../../services/users";


function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    confirm_password: "",
    role: "user" //Temporal para asignar rol de admin desde el registro
  });
  const { user } = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const payloadToSend = {
    //   ...formData,
    //   //Se adapta el uso de la api para guardar el rol en status
    //   status: formData.role,
    //   age: Number(formData.age) // El contrato exige que la edad sea un número (Validado con esto)
    // };

    if (formData.password !== formData.confirm_password) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Mapeamos los datos al contrato de auth.model.js
    const payloadToSend = {
      nombre: formData.name,       // Cambiado de "name" a "nombre"
      email: formData.email,
      edad: Number(formData.age),  // El contrato exige que la edad sea un número (Validado con esto)
      password: formData.password,
      rol: formData.role,          // Cambiado de "status" a "rol" para el back real
      imagen: null                 // El modelo espera este campo, lo enviamos null por ahora
    };

    console.log("Payload a enviar para registro:", payloadToSend); // Agregado para depuración

    createUser(payloadToSend)
      .then((res) => {
        console.log("Respuesta del servidor:", res);
        // Como el service retorna res.data, si 'res' existe es que fue exitoso
        if (res) {
          alert("Usuario creado exitosamente");
          navigate("/login"); 
        }
      })
      .catch((error) => {
        console.error("Ocurrió un error al crear el usuario", error);
        alert(error.response?.data?.message || "Error al registrar usuario");
      });
  };

  //   createUser(payloadToSend)
  //     .then((res) => {console.log(res)
  //       if (res.status === 201) {
  //         alert("Usuario creado exitosamente");
  //         navigate( "/login"); // Redirige al login después de un registro exitoso
  //       }
  //     })
  //     .catch((error) => console.log("Ocurrió un error al crear el usuario", error))
  //   // ver lo de axios - - - - >>>>>> axios.post('/register', payloadToSend)...
  // };

  return (
    user
      ? <Navigate
        to="/profile"
        replace />
      :
      <div style={{ padding: "40px 20px", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>

        <div style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "var(--bg-card)",
          padding: "40px 30px",
          borderRadius: "8px",
          border: "1px solid var(--bg-border)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.5)"
        }}>

          <h1 style={{ textAlign: "center", color: "var(--accent-cyan)", marginBottom: "30px", fontSize: "2rem", letterSpacing: "1px" }}>
            Registro de usuarios
          </h1>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", color: "var(--text-muted)", fontWeight: "bold", fontSize: "0.9rem" }}>Nombre:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
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

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", color: "var(--text-muted)", fontWeight: "bold", fontSize: "0.9rem" }}>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", color: "var(--text-muted)", fontWeight: "bold", fontSize: "0.9rem" }}>Edad:</label>
              <input
                type="number"
                name="age"
                value={formData.age}
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

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", color: "var(--text-muted)", fontWeight: "bold", fontSize: "0.9rem" }}>Contraseña:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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

            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", color: "var(--text-muted)", fontWeight: "bold", fontSize: "0.9rem" }}>Confirmar Contraseña:</label>
              <input
                type="password"
                name="confirm_password"
                value={formData.confirm_password}
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

            {/* Temporal rol de admin */}
            <div style={{ marginBottom: "30px" }}>
              <label style={{ display: "block", color: "var(--text-muted)", fontWeight: "bold", fontSize: "0.9rem" }}>Rol</label>
              <select
                name="role"
                value={formData.role}
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
              >
                <option value="user">Usuario</option>
                <option value="admin">Admin</option>
              </select>
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
              Crear cuenta
            </button>                                        {/*Recordar que el boton de submit es "crear cuenta"*/}
          </form>
        </div>
      </div>
  );
}

export default Register;