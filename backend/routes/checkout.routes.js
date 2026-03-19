import { Router } from "express";
// import { getCart, createOrder } from "./../controllers/checkout.controller.js";
import checkToken from "./../utils/validators/auth.checkToken.js";

const routes = Router();

// routes.use(checkToken);
// routes.get("/orders", getCart);
// routes.post("/send", createOrder);

export default routes;
