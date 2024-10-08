// src/Models/CompanyModels.ts

import { Response, Request } from 'express'
import connectToDatabase from '../utils/connect'

const { formatDate } = require('../utils/utils')


class Companies {
    public id?: number
    public name?: string
    public type_id?: number
    public country_id?: number
    public tva?: string
    public created_at?: Date
    public updated_at?: Date

    public pool = connectToDatabase()

    constructor(name?: string, type_id?: number, country_id?: number, tva?: string) {
        this.name = name
        this.type_id = type_id
        this.country_id = country_id
        this.tva = tva
        this.created_at = formatDate(new Date())
        this.updated_at = formatDate(new Date())
    }
    /**
     * Return data Mysql table companies
     * @param req request
     * @param res responce
     * @returns datas companies
     */
    public getCompanies = async (req: Request, res: Response): Promise<any> => {

        try {
            const query = `
                SELECT companies.*, country.name as country , types.name as type
                FROM companies
                JOIN country ON companies.country_id = country.id
                JOIN types ON companies.type_id = types.id`

            const [companies] = await this.pool.query(query)
            return companies

        } catch (err) {
            console.error(err)
            res.status(500).json({ error: "Internal server error" })
        }
    }
    /**
     * Return data Mysql table companies =>id
     * @param id company
     * @param req 
     * @param res 
     * @returns data company
     */
    public getCompany = async (id: number|undefined, req: Request, res: Response): Promise<any> => {
        try {

            const query = `
                SELECT companies.*, country.name as country, country.initials as initials , types.name as type
                FROM companies
                JOIN country ON companies.country_id = country.id
                JOIN types ON companies.type_id = types.id 
                WHERE companies.id = ?`

            const [company] = await this.pool.query(query, [id]) as any
            
            if(company.length == 0)
                return res.status(400).json({message : 'Company non found!'})

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
    public postCompany = async (req: Request, res: Response): Promise<any> => {
        try {

            const isExistCompany = await this.isExist(this.tva) as any

            if(isExistCompany.length > 0)
                return false

            const query = `
            INSERT 
            INTO companies(name, type_id, country_id, tva, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?)`

            const [company] = await this.pool.query(query, [
                this.name,
                this.type_id,
                this.country_id,
                this.tva,
                this.created_at,
                this.updated_at
            ])
            
           
            const data = {
                name:this.name,
                type_id : this.type_id,
                country_id : this.country_id, 
                tva : this.tva,
                created_at : this.created_at,
                updated_at : this.created_at,
            }

            
            return  data 

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal server error" })
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
    public updateCompany =  async (id:number,data:any,  req:Request , res:Response) =>{

        const isExistCompany = await this.isExist('',id) as any         

        if(isExistCompany.length === 0)
            return false

        data.updated_at = this.updated_at
        const fields = Object.keys(data).map(key => `${key} = ?`).join(', ')        

        const query = `
            UPDATE companies
            SET ${fields}
            WHERE id = ?
        `        
        const copanyUpdate = await this.pool.query(query,[...Object.values(data), id])        
    }

    /**
     * delete de company with id 
     * @param id  company
     * @param req 
     * @param res 
     * @returns Return company data or indicate that the company does not exist if the company is not found in the companies table.
     */
    public deleteCompany = async (id:number , req: Request, res: Response): Promise<any> => {
        
        try {
            const isExistCompany = await this.isExist('',id) as any
            
            if(isExistCompany.length === 0)
                return false

            const query = `
            DELETE 
            FROM companies 
            WHERE id = ?`

            const [company] = await this.pool.query(query, [id])            
            return company 

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal server error" })
        }
    }
    /**
     * Check if the company exist with de tva or id 
     * @param tva in the company
     * @param id ithe company
     * @returns data company
     */
    public isExist = async (tva?: any, id?: number): Promise<any> => {

        const queryCompanyIsExist = `
                SELECT companies.name,companies.tva, companies.id
                FROM companies
                WHERE companies.tva = ? OR companies.id = ?`;

        const [isExist] = await this.pool.query(queryCompanyIsExist, [tva, id]);

        return isExist

    }
}

export default Companies

