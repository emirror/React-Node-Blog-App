import express from "express"
import { NotFoundError } from '../utils/error.js';
import general from './general.js';
import admin from './admin/index.js';
import api from './api/index.js';
import auth from './auth.js';

const router = express.Router();

router.use("/", auth);
router.use("/", general);
router.use("/admin", admin);
router.use("/api", api);

router.use((req, res, next) => {
    next(new NotFoundError('Route not found'));
});

export default router;