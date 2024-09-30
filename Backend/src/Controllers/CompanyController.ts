// src/Controllers/CompanyControllers
import { Request, Response } from 'express' // Make sure you import these
import { Company, getCompanies } from '../Models/CompanyModels'

const viewAll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const companies = await getCompanies() 
        const datas = {
            companies: companies,
        };
        return res.status(200).json(datas) 

    } catch (error: any) {
        console.error("Error fetching companies:", error)
        return res.status(500).json({ error: 'An error occurred while fetching companies' })
    }
}

export { viewAll }