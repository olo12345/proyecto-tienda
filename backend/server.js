import dotenv from "dotenv";
import cors from 'cors';
import express from "express";

dotenv.config({ debug: true }); //cambio esto pa' ver por qué no funciona la w....

//rutas
import authRouter from "./routes/auth.routes.js";
import checkoutRouter from "./routes/checkout.routes.js";
import libroRouter from "./routes/libro.routes.js";

//helpers
import logger from "./utils/helpers/logger.js";

console.log("¿Mi secreto existe?:", process.env.JWT_SECRET);

const app = express();

app.use(express.json());
app.use(cors());

app.use(logger)

app.use("/api/auth", authRouter);
app.use("/api/libros", libroRouter);
app.use("/api/checkouts", checkoutRouter);
app.use((_, res) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT,
  console.log(`Server is running on port http://localhost:${PORT}`)
);

// export default app;