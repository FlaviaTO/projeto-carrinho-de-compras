import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secreta-temporaria";

export const autenticarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, usuario) => {
    if (err) return res.sendStatus(403);
    req.usuario = usuario;
    next();
  });
};
