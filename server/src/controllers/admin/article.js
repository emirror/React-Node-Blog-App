class ArticleController {
    list(req, res) {
        res.send("Article list");
    }
}

export default new ArticleController();