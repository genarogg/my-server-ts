import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { prisma, errorResponse } from "@fn";



const verificarToken = async (req: Request, res: Response, next: NextFunction) => {
    const JWTSECRETO = process.env.JWTSECRETO || "jwt-secret";
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json(errorResponse({ message: "Token no proporcionado o inválido" }));
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, JWTSECRETO) as JwtPayload | undefined;

        if (!payload || !payload.id) {
            return res.status(401).json(errorResponse({ message: "El token no contiene un id de usuario válido" }));
        }

        const usuario = await prisma.user.findUnique({
            where: { id: payload.id },
        });

        if (!usuario) {
            return res.status(404).json(errorResponse({ message: "Usuario no encontrado" }));
        }

        const body = {
            ...req.body,
            user: usuario,
        };

        req.body = body;

        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: "Error al verificar el token",
            type: "error"
        });
    } finally {
        await prisma.$disconnect();
    }
};

export default verificarToken;