import express from "express"
import ArticleController from "../../controllers/api/article.js";
import acl from "../../middlewares/acl.js";
import auth from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, acl("WRITER"), ArticleController.list);
router.get("/:id", auth, acl("WRITER"), ArticleController.get);
router.post("/", auth, acl("WRITER"), ArticleController.create);
router.put("/:id", auth, acl("MODERATOR"), ArticleController.update);
router.delete("/:id", auth, acl("ADMIN"), ArticleController.delete);

export default router;


