import { Router } from "express";
import { getCart, createOrder, updateCart, deleteItem } from "./../controllers/checkout.controller.js";
import checkToken from "./../utils/validators/auth.checkToken.js";

const routes = Router();

routes.use(checkToken);
routes.get("/cart", getCart);
routes.post("/send", createOrder);
routes.put("/cart", updateCart);
routes.delete("/cart", deleteItem);

export default routes;