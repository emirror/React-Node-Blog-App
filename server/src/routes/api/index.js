import express from "express"
import article from './article.js';

const router = express.Router();

router.use("/articles", article);

export default router;