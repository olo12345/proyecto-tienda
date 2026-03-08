import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    confirm_password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payloadToSend = {
      ...formData,
      age: Number(formData.age) // El contrato exige que la edad sea un número (Vlidado con esto)
    };

    console.log("Registro Exisotos:", payloadToSend);
    // ver lo de axios - - - - >>>>>> axios.post('/register', payloadToSend)...
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
          <label>Edad:</label>
          <input 
            type="number" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
            required
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

      <div>
          <label>Confirmar Contraseña:</label>
          <input 
            type="password" 
            name="confirm_password" 
            value={formData.confirm_password} 
            onChange={handleChange} 
            required
          />
        </div>

      <button type="submit">Crear cuenta</button>                                        {/*Recordar que el boton de submit es "crear cuenta"*/}
    </form>
  </div>
);
}

export default Register