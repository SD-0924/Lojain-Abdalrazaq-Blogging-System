import e from "express";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root123",
    database: process.env.DB_NAME || "blogging_database",
    logging: console.log,  
});

export default sequelize;