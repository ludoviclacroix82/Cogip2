// src/Controllers/CompanyControllers.ts
import { Request, Response } from 'express'
import Companies from '../Models/CompanyModels'
import {validatorCompany} from '../utils/validator'

const viewAll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const companies = new Companies()
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
        const companyData = await company.postCompany(req,res)      

        if(companyData === "isExist")
            return res.status(409).json({ error: "L'entreprise existe déjà avec ce numéro de TVA." })
        
        return res.status(201).json({ message: 'Company created successfully', data: value })
        
    } catch (error) {
        console.error("Error fetching company:", error)
        return res.status(500).json({ error: 'An error occurred while fetching company' })
    }
}

const deleteCompany = async (req :Request , res:Response) =>{
   
    const { id } = req.params
    const companyId = parseInt(id)

    try {
        const companyData = await new Companies().deleteCompany(companyId,req,res)

        if(companyData === "isNotExist")
            return res.status(409).json({ error: "L'entreprise n'existe pas! " })
        
        return res.status(201).json({ message: 'Company Deleted successfully' })   
        
    } catch (error) {
        console.error("Error fetching company:", error)
        return res.status(500).json({ error: 'An error occurred while fetching company' })
    }
}

export { viewAll ,view ,create, deleteCompany }
