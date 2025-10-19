import { Sequelize } from "sequelize";


export const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    propsess.env.DATABASE_USER,
    process.env.DATABASE_PASSOWRD, {
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
}
)