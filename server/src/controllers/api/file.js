import path from "path";

class FileController {
    upload(req, res) {
      const filePath = path.relative("",req.file.path).replace(/\\/g, "/")
     const staticPath= filePath.split("/").splice(1).join("/")
      res.json(staticPath);
    }
}

export default new FileController();