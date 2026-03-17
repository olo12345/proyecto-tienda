import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { checkToken } from ",./../middlewares/auth.checkToken.js";
import {validateEmail} from "../utils/validators/email.validate.js";
import { verificarLogin } from "../utils/validators/login.validate.js";

const routes = new Router();

routes.use("/login", validateEmail);
routes.use("/login", verificarLogin);
routes.post("/login", authController.loginUser);

routes.use("/register", validateEmail);
routes.use("/register", verificarLogin)
routes.post("/register", authController.createUser);

routes.use("/usuarios", checkToken);
routes.get("/usuarios", authController.verificarCredenciales);

// routes.get("/me", authMiddleware, authController.me);

export default routes;