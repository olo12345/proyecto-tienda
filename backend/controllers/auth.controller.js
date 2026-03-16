import "dotenv/config";
import jwt from "jsonwebtoken";
// import { nanoid } from "nanoid"; lo usamos en proytectos pasados pero no lo necesitamos ahora (usaremos bcrypt instead)
import bcrypt from "bcrypt";
import { authModel } from "./../models/auth.model.js";

const loginUser = async (req, res) => {
  try {
    //crear req.user en middleware validador
    const { email = "", password = "" } = req.user;
    const result = await authModel.loginUserModel(email)
    if (!result.rowCount) throw { code: 404, message: "No se encontró ningún usuario con estas credenciales" };
    else {
      const hashedPass = result.rows[0].password;
      const passMatch = bcrypt.compareSync(password, hashedPass)
      if (!passMatch) throw { code: 404, message: "No se encontró ningún usuario con estas credenciales" };
      else {
        const payload = { email, rol: user.rol };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.send(token);
      }
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body;
    if (await authModel.isEmailRegistered(email)) throw { code: 400, message: "Ya existe un usuario registrado con ese email" };
    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = { ...req.body, password: hashedPassword };
      const success = await authModel.createUserModel(newUser);
      if (success) res.status(201).send("Se creó el usuario correctamente");
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const verificarCredenciales = async (req, res) => {
  try {
    const { email } = req.user;
    const result = await authModel.verificarCredencialesModel(email);
    if (result.rowCount) console.log(`el usuario ${email} ha sido verificado correctamente`);
    res.status(200).send(result.rows);
  }
  catch (err) {
    res.status(500).send(err);
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
