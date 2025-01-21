import bcrypt from "bcryptjs";

interface EncriptarContrasenaParams {
    password: string;
}

interface CompararContrasenaParams {
    password: string;
    hashedPassword: string;
}

const encriptarContrasena = ({ password }: EncriptarContrasenaParams): string => {
    if (!password) {
        throw new Error("La contraseña no puede estar vacía");
    }
    return bcrypt.hashSync(password, 10);
};

const compararContrasena = ({ password, hashedPassword }: CompararContrasenaParams): boolean => {
    if (!password || !hashedPassword) {
        throw new Error("La contraseña y la contraseña encriptada no pueden estar vacías");
    }
    return bcrypt.compareSync(password, hashedPassword);
};

export { encriptarContrasena, compararContrasena };