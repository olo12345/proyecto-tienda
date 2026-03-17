import cors from 'cors';
import "dotenv/config";
import express from "express";

//rutas
import authRouter from "./routes/auth.routes.js";
import checkoutRouter from "./routes/checkout.routes.js";
import libroRouter from "./routes/libro.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/libros", libroRouter);
app.use("/api/checkouts", checkoutRouter);
app.use((_, res) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});