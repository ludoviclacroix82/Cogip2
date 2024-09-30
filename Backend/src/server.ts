import express from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize'; // Correct import for Sequelize
import route from './Routes/route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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

app.use('/', route);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Quelque chose s\'est mal passé !');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
