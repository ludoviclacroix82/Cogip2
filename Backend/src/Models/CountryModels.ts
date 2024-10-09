// src/Models/CountryModels.ts
import { DataTypes,Model } from "sequelize"
import { Request, Response } from 'express'
import sequelize from '../utils/db'

class Country extends Model{

    public static getCountries = async (req: Request, res: Response) => {
        try {
           const countries = await Country.findAll()
           return countries
        } catch (error) {
            console.error(error)
        }
    }

    public static getCountry = async (id:number, req: Request, res: Response) => {
        try {
            const countries = await Country.findOne({where: {id}})
            return countries
         } catch (error) {
             console.error(error)
         }
    }
    public static postCountry = async (data:any,req: Request, res: Response) => {
        try {
            const countryIsExist = await Country.findOne({
                where: {
                    initials : data.initials
                }
            })
            
            if(countryIsExist) return null

            const countryCreate = await Country.create({ ...data})
            return countryCreate   

        } catch (error) {
            console.log(error)            
        }
    }
    public static deleteCountry = async (id:number,req: Request, res: Response) => {
        try {
            const countryIsExist = await Country.findOne({where: {id} })            
            if(countryIsExist) return null

            const countryDelete = await Country.destroy({where: {id}})
            return countryDelete
        } catch (error) {
            console.log(error)
            
        }

    }
}

Country.init({
        id:{
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING,
        },
        initials:{
            type:DataTypes.STRING,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Country',
        tableName: 'country',
        timestamps: false,
    },
)

export default Country