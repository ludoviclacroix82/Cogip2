// src/utils/db
import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.MYSQL_DB || '';
const dbUser = process.env.MYSQL_USER || '';
const dbPassword = process.env.MYSQL_PWD || '';
const dbHost = process.env.MYSQL_HOST || 'localhost';
const dbPort = parseInt(process.env.MYSQL_PORT || "3306", 10);

const sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPassword,
    {
        dialect: "mysql",
        host: dbHost,
        port: dbPort,
    }
);

export default sequelize