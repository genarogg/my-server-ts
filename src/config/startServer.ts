import { log } from "@fn";

const PORT = process.env.PORT || 4000;

const sumar = (a: string | number, b: number): number => {
    if (typeof a === 'string') {
        a = parseFloat(a);
    }
    return a + b;
}

const startServer = (app: any) => {
    app.listen(PORT, () => {
        log.success(`El servidor esta corriendo en http://localhost:${PORT}`);
        log.info(`Graphql esta corriendo en http://localhost:${PORT}/graphql`);
    });
}

export default startServer;