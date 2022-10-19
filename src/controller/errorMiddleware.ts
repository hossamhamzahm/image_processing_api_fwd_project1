import express from 'express';
import { read_org_imgs } from '../utils/read_imgs';

const errorMiddleware = async (
    error: express.ErrorRequestHandler,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
): Promise<void> => {
    res.status(400).render('error', { error, imgs: await read_org_imgs() });
};

export default errorMiddleware;
