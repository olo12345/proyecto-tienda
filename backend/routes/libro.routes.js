import { Router } from "express";
import { getItem, getAllItems, getItems, getItemsFilter, createItem, editItem, addComentario } from "./../controllers/libro.controller.js";
import checkToken from "./../utils/validators/auth.checkToken.js";
import isAdmin from "./../utils/validators/admin.validate.js";


const routes = Router();

routes.get("/", getItems);
routes.get("/:id", getItem);
routes.get("/filter", getItemsFilter);
//autenticación requerida para agregar comentarios y otros endpoints de administración
routes.use(checkToken);

routes.post("/comentarios/:id", addComentario);

//Verificación de autorización de administrador para endpoint de administración
routes.use(isAdmin);

routes.get("/all", getAllItems);
routes.post("/", createItem);
routes.put("/:id", editItem);

export default routes;
