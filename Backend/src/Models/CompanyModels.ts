import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../utils/connect';
import { Country } from './CountryModels'; // Assurez-vous que le chemin est correct

class Company extends Model {
    
}

// Initialisation du modèle
Company.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    country_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tva: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Company',
    tableName: 'companies',
    timestamps: false,
});

// Fonction pour récupérer toutes les entreprises
async function getCompanies() {
    const companies = await Company.findAll({
        order: [[sequelize.fn('length', sequelize.col('name')), 'ASC']],       
    });

    return companies;
}

export { Company, getCompanies };
