import "dotenv/config";
import jwt from "jsonwebtoken";

const checkToken = (req, res, next) => {
    const Authorization = req.header("Authorization");
    const token = Authorization?.split("Bearer ")[1];

    if (!token) throw {code: 401, message:"Se necesita un Token de acceso para acceder"}
    else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        }
        catch (err) {
            return res.status(401).json({error: "Token inválido"})
        }
    }
}

export default checkToken;