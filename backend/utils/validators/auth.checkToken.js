import "dotenv/config";
import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
const Authorization = req.header("Authorization");
const token = Authorization?.split("Bearer ")[1];
if (!token) {
    return res.status(401).json({ message: "Se necesita un Token de acceso" });
}
try {
    const secret = process.env.JWT_SECRET || "clave_temporal_de_emergencia_2026";
    const decoded = jwt.verify(token, secret);
    // req.user = decoded; Debería funcionar para crear la nueva propiedad pero resultaba en error
    Object.defineProperty(req, "user",{value: decoded})
    next();
}
catch (err) {
    console.error("Error en validación de token:", err.message);
    return res.status(401).json({ error: "Token inválido" });
}
}

export default checkToken;