import express from "express"
import general from './general.js';
import { notFoundError } from '../utils/error.js';

const router = express.Router();

router.use("/", general);

router.use((req, res, next) => {
    next(new notFoundError('Route not found'));
});

export default router;