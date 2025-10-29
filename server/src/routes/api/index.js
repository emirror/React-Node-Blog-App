import express from "express"
import article from './article.js';
import auth from './article.js';

const router = express.Router();

router.use("/articles", article);
router.use("/login", auth);

export default router;