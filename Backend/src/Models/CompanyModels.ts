// src/Models/CompanyModels.ts

import { Response, Request } from 'express'
import connectToDatabase from '../utils/connect'
import { log } from 'console'
import { number } from 'joi'

const {formatDate} = require('../utils/utils')


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
    public getCompanies = async (req: Request, res: Response) => {

        try {
            const query = `
                SELECT companies.*, country.name as country , types.name as type
                FROM companies
                JOIN country ON companies.country_id = country.id
                JOIN types ON companies.type_id = types.id`

            const [companies] = await this.pool.query(query)

            console.log('GET Companies')
            return companies

        } catch (err) {
            console.error(err)
            res.status(500).json({ error: "Internal server error" })
        }
    }

    public getCompany = async (id : number,req: Request, res: Response) => {
        try {`
            `
            const query = `
                SELECT companies.*, country.name as country , types.name as type
                FROM companies
                JOIN country ON companies.country_id = country.id
                JOIN types ON companies.type_id = types.id 
                WHERE companies.id = ?`

            const [company] = await this.pool.query(query,[id])

            console.log(`GET Company ID:${id}`)
            return company

        } catch (err) {
            console.error(err)
            res.status(500).json({ error: "Internal server error" })
        }
    }

    public postCompany = async (req: Request, res: Response) => {
        try {

            const isExistCompany = await this.isExist(this.tva)

            if (Array.isArray(isExistCompany) && isExistCompany.length > 0) { 
                return 'isExist'                               
            }
            console.log( 'test:' + this.isExist(this.tva) )
            
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
            console.log(`POST Company ${this.name}`)
            return company
            
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal server error" })
        }
    }

    public deleteCOmpany = async ( req:Request , res:Response) =>{

        try {
            
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal server error" })
        }
    }

    public isExist = async (tva:any) =>{

        const queryCompanyIsExist = `
                SELECT companies.name,companies.tva
                FROM companies
                WHERE companies.tva = ?`;

            const [isExist] = await this.pool.query(queryCompanyIsExist, [tva]);
        
        return isExist

    }
}

export default Companies

