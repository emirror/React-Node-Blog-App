import Article from "../../models/article";

class ArticleController {
    list(req, res) {

        const articles = Article.findAll();
        res.send("Article list");
    }

    async add(req, res) {
        const { title, content } = req.body;
        res.send("Add article");
        await Article.create({ title, content })
        res.redirect("/admin/articles");
    }

    async get(req, res) {
        const { id } = req.params;

        const article = await Article.findByPk(id);
        res.send("Get article " + id);
    }

    async edit(req, res) {
        const { id } = req.params;
        const article = await Article.findByPk(id);
        res.send("Edit article " + id);
    }

    async update(req, res) {

        const { id } = req.params;
        const { title, content } = req.body;

        const article = await Article.findByPk(id);
        res.send("Update article " + id);

        article.title = title;
        article.content = content;
        
        await article.save();
        res.redirect(`/admin/articles/${id}`);
    }

    async delete(req, res) {
        const { id } = req.params;
        const article = await Article.findByPk(id);
        res.send("Delete article " + id);

        await article.destroy();
        res.redirect("/admin/articles");
    }
}

export default new ArticleController();