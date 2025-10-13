import express from "express"
import { notFoundError } from '../utils/error.js';
import general from './general.js';
import admin from './admin/index.js';

const router = express.Router();

router.use("/", general);
router.use("/admin", admin);

router.use((req, res, next) => {
    next(new notFoundError('Route not found'));
});

export default router;