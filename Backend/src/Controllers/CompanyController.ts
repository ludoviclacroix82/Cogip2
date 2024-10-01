// src/Controllers/CompanyControllers.ts
import { Request, Response } from 'express'
import connectToDatabase from '../utils/connect'
import Companies from '../Models/CompanyModels';
import Joi from 'joi'
import {validatorCompany} from '../utils/validator'

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

const view = async (req: Request, res: Response) => {

    const { id } = req.params
    const companyId = parseInt(id)
    console.log(companyId)
    
    
    try {
        const company = new Companies()
        const companyData = await company.getCompany(companyId,req,res)
        return res.status(200).json(companyData)
        
    } catch (error) {
        console.error("Error fetching company:", error)
        return res.status(500).json({ error: 'An error occurred while fetching company' })
    }

}

const create = async (req: Request, res: Response) => {
    
    const { error, value } = validatorCompany(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    try {
        const company = new Companies(
            value.name,
            value.type_id,
            value.country_id,
            value.tva
        )
        const companyData = await company.postCompany(req,res)
        return res.status(200).json(companyData)
        
    } catch (error) {
        console.error("Error fetching company:", error)
        return res.status(500).json({ error: 'An error occurred while fetching company' })
    }

    console.log('Post Company');

    return res.status(201).json({ message: 'Company created successfully', data: value });
}

export { viewAll ,view ,create }
