import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registro Exisotos:", formData);
    // ver lo de axios - - - - >>>>>> axios.post('/register', formData)...
  };
  
  return (
    <div>
    <h1>Registro de usuarios</h1>
    
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
        />
      </div>

      <div>
        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
        />
      </div>

      <div>
        <label>Contraseña:</label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
        />
      </div>

      <button type="submit">Crear cuenta</button>                                        {/*Recordar que el boton de submit es "crear cuenta"*/}
    </form>
  </div>
);
}

export default Register