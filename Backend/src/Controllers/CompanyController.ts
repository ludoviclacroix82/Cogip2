// src/Controllers/CompanyControllers.ts
import { Request, Response } from 'express' 
import connectToDatabase from '../utils/connect' 
import Companies from '../Models/CompanyModels';

const pool = connectToDatabase() 

const viewAll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const companies = new Companies();
        const companiesDatas = await companies.getCompanies(req, res) 
        const datas = {
            companies: companiesDatas,
        }
        return res.status(200).json(datas) 

    } catch (error: any) {
        console.error("Error fetching companies:", error)
        return res.status(500).json({ error: 'An error occurred while fetching companies' })
    }
}

export { viewAll }
