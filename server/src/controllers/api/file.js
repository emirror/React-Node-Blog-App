
class FileController {
      async upload(req, res) {
        
        res.json({ message: "File uploaded successfully" });
        
      
    }
}

export default new FileController();