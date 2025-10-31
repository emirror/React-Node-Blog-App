import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
const User = sequelize.define("user",
    {

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "USER",
        },
    },
    {
        defaultScope: {
            attributes: {
                exclude: ["password"],
            },
        },
        scopes: {
            withPassword: {},
        },
    }
);

export default User;