import "dotenv/config";
import jwt from "jsonwebtoken";
// import { nanoid } from "nanoid"; lo usamos en proytectos pasados pero no lo necesitamos ahora (usaremos bcrypt instead)
import bcrypt from "bcrypt";
import { authModel } from "../models/auth.model.js";
import { isValidEmail } from "../utils/validators/email.validate.js";

const login = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ error: "Email and password son requeridos" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "email invalido" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "la contraseña debe ser de al menos 6 caratctéres" });
    }

    const user = await authModel.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    //aqui es donde usamos el bcrypt para comparar con la guardada en la bd
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Contraseña inválida" });
    }

    const payload = { email, id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.json({ email, token });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const register = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;

    if (!email.trim() || !password.trim()) {
      return res.status(400).json({ error: "Email y contraseña requeridos" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "email invalido" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "la contraseña debe ser de al menos 6 caratctéres" });
    }

    const user = await authModel.getUserByEmail(email);
    if (user) {
      return res.status(400).json({ error: "El usuario ya se encuentra registrado" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserDB = await authModel.addUser({ email, password: hashedPassword });

    const payload = { email, id: newUserDB.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.json({ email, token });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const me = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await authModel.getUserByEmail(email);
    return res.json({ email, id: user.id });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const authController = {
  login,
  register,
  me,
};
