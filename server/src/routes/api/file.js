import express from "express";
import FileController from "../../controllers/api/file.js";
import uploader from "../../middlewares/uploader.js";
import auth from "../../middlewares/auth.js";
const router = express.Router();

router.post("/upload", auth, uploader.single("file") ,FileController.upload);


export default router;


