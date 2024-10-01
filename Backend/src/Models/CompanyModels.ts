// src/Models/CompanyModels.ts

import { Pool } from 'mysql2/promise'
import { Response, Request } from 'express'
import connectToDatabase from '../utils/connect'

class Companies {
    public name?: string
    public type_id?: number
    public country_id?: number
    public tva?: string
    public created_at?: Date
    public updated_at?: Date 

    public pool:any

    constructor(name?: string, type_id?: number, country_id?: number, tva?: string, created_at?: Date, updated_at?: Date) {
        this.name = name
        this.type_id = type_id
        this.country_id = country_id
        this.tva = tva
        this.created_at = created_at
        this.updated_at = updated_at 
    }

   public async getCompanies(req: Request, res: Response): Promise<void> {
    this.pool = connectToDatabase()

    try {
        const query = "SELECT * FROM companies"
        const [companies] = await this.pool.query(query)

        console.log('GET Companies');
        
        return companies
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Internal server error" })
    }
}
}

export default Companies 

