// src/Models/CompanyModels.ts
import { DataTypes, Model } from 'sequelize'
import { Request, Response } from 'express'
import sequelize from '../utils/db'
import Companies from './_CompanyModels'

const { formatDate } = require('../utils/utils')

class Company extends Model {
    /**
     * Return data Mysql table companies
     * @param req request
     * @param res responce
     * @returns datas companies
     */
    public static getCompanies = async (limit: number, offset: number, req: Request, res: Response) => {

        try {
            const companies = await Company.findAll({
                limit: limit,
                offset: offset,
                order: [['created_at', 'DESC']],
            })
            return companies
        } catch (err) {
            console.error(err)
        }
    }
    /**
    * Return data Mysql table companies =>id
    * @param id company
    * @param req 
    * @param res 
    * @returns data company
    */
    public static getCompany = async (id: number | undefined, req: Request, res: Response): Promise<any> => {
        try {
            const company = await Company.findOne({ where: { id } })
            return company

        } catch (err) {
            console.error(err)
            res.status(500).json({ error: "Internal server error" })
        }
    }

        /**
     * Created company in te mysql tabale companies
     * @param req 
     * @param res 
     * @returns Return company data or indicate that it exists if the company is found in the companies table
     */
    public static postCompany = async (data:any,req: Request, res: Response): Promise<any> => {
        try {

            const companyTvaExist = await Company.findOne({
                 where: {
                      tva: data.tva 
                }
            })
            if(companyTvaExist)  return null

            const companyCreate = await Company.create(data)                
            return companyCreate
                   
        } catch (error) {
                console.error(error)
        }
    }
    /**
     * Update company with ID
     * @param id ID company for Update [params]
     * @param data data requestBody
     * @param req 
     * @param res 
     * @returns return 200 is sucess + data / return 400 is company Id no found
     */
    public static updateCompany =  async (id:number,data:any,  req:Request , res:Response) =>{

        try {
          const updated_at = formatDate(new Date())        

           const companyUpdate = await Company.update(
            {...data,updated_at},
            {where: {id:id}}
           )

           return companyUpdate          
        } catch (error) {
                console.error(error)
        }       
    }

   /**
     * delete de company with id 
     * @param id  company
     * @param req 
     * @param res 
     * @returns Return company data or indicate that the company does not exist if the company is not found in the companies table.
     */
   public static deleteCompany = async (id:number , req: Request, res: Response): Promise<any> => {
        
        try {
            const companyDelete = await Company.destroy({where : {id} })
            return companyDelete
        } catch (error) {
            console.error(error)
        }
    }   
}

Company.init({

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    type_id: {
        type: DataTypes.INTEGER,
    },
    country_id: {
        type: DataTypes.INTEGER,
    },
    tva: {
        type: DataTypes.STRING
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
        modelName: 'Company',
        tableName: 'companies',
        timestamps: false,
    },
)

export default Company