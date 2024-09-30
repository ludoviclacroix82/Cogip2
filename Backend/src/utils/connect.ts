// src/utils/connect
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Create a new instance of Sequelize
const sequelize = new Sequelize(
    process.env.MYSQL_DB as string,
    process.env.MYSQL_USER as string,
    process.env.MYSQL_PWD as string,
    {
        dialect: "mysql",
        host: process.env.MYSQL_HOST as string,
        port: Number(process.env.MYSQL_PORT), 
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connecté à la base de données MySQL!');
    } catch (error) { 
        console.error('Impossible de se connecter, erreur suivante :', error);
    }
}

testConnection();

export {sequelize}