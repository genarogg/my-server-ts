type ResponseType = "success" | "error";

interface ResponsePayload {
    message?: string;
    type?: ResponseType;
    token?: string;
    [key: string]: any;
}

const createResponse = (type: ResponseType, message?: string, token?: string, additionalParams?: object): ResponsePayload => {
    const payload: ResponsePayload = { type };

    if (message) {
        payload.message = message;
    }

    if (token) {
        payload.token = token;
    }

    if (additionalParams) {
        Object.assign(payload, additionalParams);
    }

    return payload;
};

// Funciones de ayuda
const successResponse = ({ message, token, additionalParams }: ResponsePayload): ResponsePayload => {
    return createResponse("success", message, token, additionalParams);
};

const errorResponse = ({ message, token, additionalParams }: ResponsePayload): ResponsePayload => {
    return createResponse("error", message, token, additionalParams);
};

export { createResponse, successResponse, errorResponse };