import jwt from "jsonwebtoken";

interface Usuario {
    id: Number;
}

const generarToken = (usuario: Usuario) => {
    const JWTSECRETO = process.env.JWTSECRETO || "jwt-secret";
    const JWTTIEMPO = process.env.JWTTIEMPO || "1d";

    const { id } = usuario;

    const token = jwt.sign(
        {
            id,
        },

        JWTSECRETO,

        {
            expiresIn: JWTTIEMPO,
        }
    );

    return token;
};

export default generarToken;
