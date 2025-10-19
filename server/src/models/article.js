import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
const Article = sequelize.define("articles", {
    title: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

export default Article;