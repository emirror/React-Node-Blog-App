import Article from "../../models/article.js";
import { NotFoundError } from "../../utils/error.js";

class ArticleController {
    async list(req, res) {

        const data = await Article.findPaginate(req.query.page, {
            include: ["user"],
        });
        res.json(data);
    }


    async get(req, res) {

        const { id } = req.params;

        const article = await Article.find(id, { include: ["user"] });
        if (!article) {
            throw new NotFoundError("Article not found");
        }

        res.json(article);
    }


    async create(req, res) {
        const { title, content, image } = req.body;

        const articles = await Article.create({ title, content, image, userId: req.user.id });

        res.json(articles);
    }

    async update(req, res) {
        const { id } = req.params;
        const { title, content, image } = req.body;

        const article = await Article.findByPk(id);

        if (!article) {
            throw new NotFoundError("Article not found");
        }

        article.title = title;
        article.content = content;
        article.image = image;

        await article.save();

        res.json(article);
    }

    async delete(req, res) {
        const { id } = req.params;

        const article = await Article.findByPk(id);

        if (!article) {
            throw new NotFoundError("Article not found");
        }

        await article.destroy();

        res.json(article);
    }
}

export default new ArticleController();