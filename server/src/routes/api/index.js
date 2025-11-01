import express from "express"
import article from './article.js';
import file from './file.js';


const router = express.Router();

router.use("/articles", article);
router.use("/file", file);

export default router;