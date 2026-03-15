import cors from 'cors';
import "dotenv/config";
import express from "express";

//rutas
import authRoute from "./routes/auth.route.js";
import checkoutRoute from "./routes/checkout.route.js";
import libroRoute from "./routes/libro.route.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/libros", libroRoute);
app.use("/api/checkouts", checkoutRoute);
app.use((_, res) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});