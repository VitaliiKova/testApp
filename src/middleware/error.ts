import {ErrorRequestHandler} from "express";
import log4js from "log4js";

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;

class HttpException extends Error {
    public status: number
    public Message: string

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.Message = message;
    }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.isAxiosError && err.response.status === 415) {
        logger.error(err.response);
        return res.status(406).json(
            new HttpException(406, `Unsupported 'Accept' header: ${req.headers.accept}. Must accept 'application/json'`)
        );

    } else if (err.isAxiosError) {
        logger.error(err.response);
        return res.status(err.response.status).json(
            new HttpException(err.response.status, err.response.statusText)
        );

    }  else if (err instanceof Error) {
        logger.error(err.message)
        return res.status(400).json(new HttpException(400, err.message));

    } else {
        logger.error('Something went wrong')
        return res.status(400).json(new HttpException(400, 'Something went wrong'));
    }

}
