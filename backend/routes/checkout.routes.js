import { Router } from "express";
import { checkoutController } from "../controllers/checkout.controller.js";
import { checkToken } from "../middlewares/auth.checkToken.js";

const routes = Router();

routes.use(checkToken);
routes.post("/send", checkoutController.createOrder);

export default routes;
