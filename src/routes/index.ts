import express from 'express';
import imgRouter from './img';
const router = express.Router();

router.use('/images', imgRouter);

export default router;
