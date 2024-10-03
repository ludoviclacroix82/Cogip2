// src/Controllers/CompanyControllers.ts
import { Request, Response } from 'express'
import Companies from '../Models/CompanyModels'
import {validatorCompany} from '../utils/validator'

const viewAll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const companies = await new Companies().getCompanies(req, res)
        return companies

    } catch (error: any) {
        console.error("Error fetching companies:", error)
        return res.status(500).json({ error: 'An error occurred while fetching companies' })
    }
}

const view = async (req: Request, res: Response) => {

    const { id } = req.params
    const companyId = parseInt(id)   
    
    try {
        const company = await new Companies().getCompany(companyId,req,res)
        return company
        
    } catch (error) {
        console.error("Error fetching company:", error)
        return res.status(500).json({ error: 'An error occurred while fetching company' })
    }

}

const create = async (req: Request, res: Response) => {
    
    const { error, value } = validatorCompany(req.body)

    if (error) {
        return res.status(400).send(error.details)
    }

    try {
        const company = new Companies(
            value.name,
            value.type_id,
            value.country_id,
            value.tva
        )
        const companyCreated = await company.postCompany(req,res)   
        return companyCreated
        
    } catch (error) {
        console.error("Error fetching company:", error)
        return res.status(500).json({ error: 'An error occurred while fetching company' })
    }
}

const update =  async(req:Request,res:Response) =>{

    const {id} = req.params
    const companyId = parseInt(id)
    const { error, value } = validatorCompany(req.body)
    if (error) {
        return res.status(400).send(error.details)
    }

    const companyUpdate = new Companies().updateCompany(companyId,value,req,res)
    return companyUpdate

}

const deleteCompany = async (req :Request , res:Response) =>{
   
    const { id } = req.params
    const companyId = parseInt(id)

    try {
        const companyDelete = await new Companies().deleteCompany(companyId,req,res)       
        return companyDelete 
        
    } catch (error) {
        console.error("Error fetching company:", error)
        return res.status(500).json({ error: 'An error occurred while fetching company' })
    }
}

export { viewAll ,view ,create, update, deleteCompany }
