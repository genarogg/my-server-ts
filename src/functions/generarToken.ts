import jwt from "jsonwebtoken";

interface Usuario {
    id: number;
}

const generarToken = (usuario: Usuario): string => {
    const JWTSECRETO = process.env.JWTSECRETO;
    const JWTTIEMPO = process.env.JWTTIEMPO || "1d";

    if (!JWTSECRETO) {
        throw new Error("La clave secreta JWTSECRETO no está definida en las variables de entorno.");
    }

    const { id } = usuario;

    try {
        const token = jwt.sign(
            { id },
            JWTSECRETO,
            {
                algorithm: "HS256",
                expiresIn: JWTTIEMPO,
            }
        );

        return token;
    } catch (error: any) {
        throw new Error(`Error al generar el token: ${error.message}`);
    }
};

export default generarToken;
