import { DataTypes } from "sequelize";
import { BaseModel, sequelize } from "../config/database.js";

class Article extends BaseModel { }

Article.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "article",
  }
);

export default Article;