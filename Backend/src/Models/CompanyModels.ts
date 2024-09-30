// src/Models/CompanyModels.ts
import { Sequelize, Model, DataTypes } from 'sequelize'
import { sequelize } from '../utils/connect' 

class Company extends Model {}

// Initialiser le modèle Company
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
    created_at: { // Notez le soulignement
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: { // Notez le soulignement
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,           
    modelName: 'Company', 
    tableName: 'companies',
    timestamps: false, // Désactive les colonnes `createdAt` et `updatedAt`
})

// Fonction pour récupérer toutes les entreprises
async function getCompanies() {
    const companies = await Company.findAll({
        order: [[sequelize.fn('length', sequelize.col('name')), 'ASC']],
    })

    return companies
}

export { Company, getCompanies }