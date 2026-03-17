import { Router } from "express";
import { libroController } from "../controllers/libro.controller.js";

const routes = Router();

routes.get("/", libroController.readLibros);
routes.get("/:id", libroController.readLibro);

export default routes;
