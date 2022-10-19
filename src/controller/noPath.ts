import express from 'express';
import { read_org_imgs } from '../utils/read_imgs';

const noPath = async (req: express.Request, res: express.Response): Promise<void> => {
    res.status(404).render('index', { imgs: await read_org_imgs() });
};

export default noPath;
