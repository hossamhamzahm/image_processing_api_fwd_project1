import express from 'express';
import asyncWrapper from 'async-wrapper-express-ts';
import resizeImage from '../controller/resizeImage';
const router = express.Router();

router.get('/', asyncWrapper(resizeImage));

export default router;
