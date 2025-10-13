import express from "express"
import ArticleController from "../../controllers/admin/article.js";

const router = express.Router();

router.get('/', ArticleController.list);


export default router;

