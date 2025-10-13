import express from "express"
import article from './articles.js';

const router = express.Router();

router.use("/articles", article);

export default router;