import { Router } from "express";
import { libroController } from "../controllers/libro.controller.js";

const router = Router();

router.get("/", libroController.readLibros);
router.get("/:id", libroController.readLibro);

export default router;
