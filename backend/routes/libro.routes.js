import { Router } from "express";
import { getItem, getAllItemsHateoas, getItemsHateoas, getItemsFilter } from "./../controllers/libro.controller.js";

const routes = Router();

routes.get("/", getAllItemsHateoas);
routes.get("/:id", getItem);

export default routes;
