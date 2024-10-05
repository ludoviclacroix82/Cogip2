// src/Controllers/InvoicesControllers
import { Request, Response } from 'express'
import Invoices from '../Models/InvoicesModels'

const { validatorInvoice} = require('../utils/validator')

const viewAll = async (req:Request , res:Response) =>{

    try {
        const invoices = await new Invoices().getInvoices(req,res)        
        return res.status(200).json({ invoices: invoices })
            
    } catch (error) {
        return res.status(500).json({message :  'Internal Server Error'})  
    }
}

const view = async (req:Request , res:Response) =>{

    try {
        const {ref} = req.params

        const invoice = await new Invoices().getInvoice(ref, req,res)

        if(!invoice)
            return res.status(400).json({ message: 'Invoice no found ' })

        return res.status(200).json({ invoice: invoice })        
        
    } catch (error) {
        return res.status(500).json({message :  'Internal Server Error'}) 
    }
}

const create = async (req:Request , res:Response) =>{

    try {
        const {error , value} = validatorInvoice(req.body)
    
        if(error)
            return res.status(400).send(error.details)
    
        const invoiceCreate = await new Invoices(value.company_id,value.price).postInvoice(req,res)


         return res.status(200).json({ message: "Country create successfully ", data: invoiceCreate })
        
    } catch (error) {
        return res.status(500).json({message :  'Internal Server Error'}) 
    }
}

const update = async (req:Request , res:Response) =>{
    try {

        const {ref} = req.params
        const {error, value} = validatorInvoice(req.body)

        if(error)
            return res.status(400).send(error.details)

        const invoiceUpdate = await new Invoices(value.company_id,value.price).updateInvoice(ref,value,req,res)

        if(!invoiceUpdate)
            return res.status(400).json({message: 'Invoice no found'})

        return res.status(200).json({ message: "Country update successfully ", data: invoiceUpdate })
        
    } catch (error) {
        return res.status(500).json({message :  'Internal Server Error'}) 
    }
}

export {viewAll , view ,create , update}