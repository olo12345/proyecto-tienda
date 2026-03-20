import { Router } from "express";
import { authController } from "./../controllers/auth.controller.js";
import checkToken from "./../utils/validators/auth.checkToken.js";
import { validateEmail } from "./../utils/validators/email.validate.js";
import { verificarLogin } from "./../utils/validators/login.validate.js";

const routes = new Router();

routes.post("/login", validateEmail, verificarLogin, authController.loginUser);

routes.post("/register", validateEmail, authController.createUser); //eliminamos el middleware de validación de registro para permitir el registro sin token

routes.use("/usuarios", checkToken);
routes.get("/usuarios", authController.verificarCredenciales);

// routes.get("/me", authMiddleware, authController.me);

export default routes;