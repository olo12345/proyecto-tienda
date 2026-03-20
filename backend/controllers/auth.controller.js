 import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authModel } from "./../models/auth.model.js";

const loginUser = async (req, res) => {
  try {
    //crear req.user en middleware validador
    const { email, password } = req.body; // pruebo temporalmente desde el body (despues devolver a user)
    const result = await authModel.loginUserModel(email);
    if (result.rowCount === 0) { 
      return res.status(401).json({ message: "Email o contraseña incorrectos" }); 
  }

      const user = result.rows[0];
  
      const hashedPass = user.usuario_password;
      if (!hashedPass) { //este if pa ver si aqui está el error
        return res.status(500).json({ error: "Error en la estructura de la base de datos" });
    }

      const passMatch = bcrypt.compareSync(password, hashedPass)
      if (!passMatch) {
        return res.status(401).json({ message: "Email o contraseña incorrectos" });
      }

      const payload = { 
        email: user.usuario_email, 
        rol: user.usuario_rol 
      };
    
      const secret = process.env.JWT_SECRET || "clave_temporal_de_emergencia_2026";
      const token = jwt.sign(payload, secret, { expiresIn: "2h" });

      return res.status(200).json({ 
        message: "Bienvenido a The Passenger Books",
        token,
        user: {
          nombre: user.usuario_nombre,
          email: user.usuario_email,
          rol: user.usuario_rol
        }
      });

  } catch (error) {
     console.log("ERROR EN EL AUTH.CONTROLLER (login user)", error);
    return res.status(500).json({ error: "Server error", detail: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password, nombre, edad, rol } = req.body;
    if (await authModel.isEmailRegistered(email)) {
      return res.status(400).json({ message: "Este email ya está en uso" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = { 
      email, 
      password: hashedPassword, 
      nombre, 
      edad: Number(edad), 
      rol: rol || 'user' 
    };

    const success = await authModel.createUserModel(newUser);

    if (success) {
      return res.status(201).json({ message: "Usuario creado con éxito. Ya puedes iniciar sesión!" });
    }

  } catch (error) {
     console.log("ERROR EN EL AUTH.CONTROLLER (create user)", error);
    return res.status(500).json({ error: "No se pudo completar el registro" });  }
};

const verificarCredenciales = async (req, res) => {
  try {
    // Este viene del middleware checkToken.....................
    const { email } = req.user;
    const result = await authModel.verificarCredencialesModel(email);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(result.rows[0]);
  }
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// const me = async (req, res) => {
//   try {
//     const { email } = req.user;
//     const user = await authModel.getUserByEmail(email);
//     return res.json({ email, id: user.id });
//   } catch (error) {
//     // console.log(error);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

export const authController = {
  loginUser,
  createUser,
  verificarCredenciales,
  // me,
};
