// src/Controllers/CompanyControllers.ts
import { Request, Response } from 'express'
import Companies from '../Models/CompanyModels'
import {validatorCompany} from '../utils/validator'

const viewAll = async (req: Request, res: Response):Promise<Response> => {
    try {
        const { limit, offset } = req.params
        const {count ,rows} = await Companies.getCompanies(parseInt(limit), parseInt(offset),req,res) as any

        console.log('GET Companies')
        return res.status(200).json({companies : rows, count: count})
    } catch (error: any) {
        console.error("Error fetching companies:", error)
        return res.status(500).json({ error: 'An error occurred while fetching companies' })
    }
}

const view = async (req: Request, res: Response):Promise<Response> => {

    const { id } = req.params
    const companyId = parseInt(id)   
    
    try {
        const company = await Companies.getCompany(companyId,req,res)

        if(company == null) return res.status(400).json({message : 'Company non found!'})

        console.log(`GET Company ID:${id}`)
        return res.status(200).json({companies : company})

        
    } catch (error) {
        console.error("Error fetching company:", error)
        return res.status(500).json({ error: 'An error occurred while fetching company' })
    }

}

const create = async (req: Request, res: Response):Promise<Response> => {
    
    const { error, value } = validatorCompany(req.body)

    if (error)  return res.status(400).send(error.details)

    try {

        const companyCreated = await Companies.postCompany(value,req,res)  
        
        if(companyCreated === null) return res.status(409).json({ error: `The VAT is already registered.` })
        
        console.log(`POST Company ${value.name}`)
        return res.status(201).json({ message: 'Company created successfully', data: companyCreated })
 
    } catch (error) {
        console.error("Error fetching company:", error)
        return res.status(500).json({ error: 'An error occurred while fetching company' })
    }
}

const update =  async(req:Request,res:Response):Promise<Response> =>{

    const {id} = req.params
    const companyId = parseInt(id)
    
    const { error, value } = validatorCompany(req.body)
    if(error) return res.status(400).send(error.details)  

    const companyUpdate = await Companies.updateCompany(companyId,value,req,res) as any

    if(companyUpdate === 0)return res.status(400).json({message: "Company no found!"})

    console.log(`Patch company #${id}`)  
    return res.status(200).json({message :  `Company #${id} update successsfully!`,data : value})

}

const deleteCompany = async (req :Request , res:Response):Promise<Response> =>{
   
    const { id } = req.params
    try {
        const companyDelete = await Companies.deleteCompany(parseInt(id),req,res) 

        if(companyDelete === 0) return res.status(400).json({message: "Company no found!"})    

        console.log(`DEKLETE Company ID:${id}`)
        return res.status(201).json({ message: 'Company Deleted successfully' })   
        
    } catch (error) {
        console.error("Error fetching company:", error)
        return res.status(500).json({ error: 'An error occurred while fetching company' })
    }
}

export { viewAll ,view ,create, update, deleteCompany }