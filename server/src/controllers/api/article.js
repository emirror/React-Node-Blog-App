import Article from "../../models/article.js";
import { NotFoundError } from "../../utils/error.js";

class ArticleController {
    async list(req, res) {
        
        const articles = await Article.findAll();
        res.json(articles);
    }


    async get(req, res) {
        
        const { id } = req.params;

        const articles = await Article.findByPk(id);

        if (!articles) {
            throw new NotFoundError("Article not found");
        }

        res.json(articles);
    }


    async create(req, res) {
        const { title, content } = req.body;

        const articles = await Article.create({ title, content, userId: req.user.id });

        res.json(articles);
    }

    async update(req, res) {
        const { id } = req.params;
        const { title, content } = req.body;

        const article = await Article.findByPk(id);

        if (!article) {
            throw new NotFoundError("Article not found");
        }

        article.title = title;
        article.content = content;

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