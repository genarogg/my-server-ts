import { PrismaClient } from '@prisma/client';
import { log } from "@fn";

const dbConection = () => {
    const prisma = new PrismaClient();

    prisma.$connect()
        .then(() => {
            log.info("db conectada!");
        })
        .catch((error: any) => {
            log.error(`Error al conectar a la db: ${error}`);
        });

}

export default dbConection;