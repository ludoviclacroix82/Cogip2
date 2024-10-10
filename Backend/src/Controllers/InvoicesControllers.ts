// src/Controllers/InvoicesControllers
import { Request, Response } from 'express'
import Invoices from '../Models/InvoicesModels'
import { formatDate } from '../utils/utils'


const { validatorInvoice } = require('../utils/validator')

const viewAll = async (req: Request, res: Response) => {

    try {
        const { limit, offset } = req.params

        const {count ,rows} = await new Invoices().getInvoices(parseInt(limit), parseInt(offset), req, res) as any      
        
        for (const invoice of rows) {
            invoice['created_at'] = formatDate(invoice['created_at'])
            invoice['updated_at'] = formatDate(invoice['updated_at'])
        }

        console.log(`Get invoices`)
        return res.status(200).json({ invoices: rows , count: count})

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const view = async (req: Request, res: Response) => {

    try {
        const { ref } = req.params

        const invoice = await new Invoices().getInvoice(ref, req, res) as any

        if (invoice === null) return res.status(400).json({ message: 'Invoice no found ' })

        console.log(`Get invoice ref: ${ref}`)
        return res.status(200).json({ invoice: invoice })

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const create = async (req: Request, res: Response) => {

    try {
        const { error, value } = validatorInvoice(req.body)

        if (error) return res.status(400).send(error.details)

        const invoiceCreate = await new Invoices().postInvoice(value, req, res)

        console.log(`Post invoice `)
        return res.status(200).json({ message: "Invoice create successfully ", data: invoiceCreate })

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const update = async (req: Request, res: Response) => {
    try {

        const { ref } = req.params
        const { error, value } = validatorInvoice(req.body)

        if (error) return res.status(400).send(error.details)

        const invoiceUpdate = await new Invoices(value.company_id, value.price).updateInvoice(ref, value, req, res)

        if (invoiceUpdate == null) return res.status(400).json({ message: 'Invoice no found' })

        console.log(`Patch invoice ref: ${ref}`)
        return res.status(200).json({ message: "Invoice update successfully ", data: {value,ref} })

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

const deleteInvoice  = async (req:Request ,res:Response) =>{
    try {

        const {ref} = req.params

        const invoiceDlete = await new Invoices().deleteInvoice(ref,req,res)

        console.log(invoiceDlete);
        

        if(invoiceDlete === 0) return res.status(400).json({message :  'Invoice no found'})

        console.log(`Delete invoice ref: ${ref}`)
        return res.status(200).json({message : 'Deleted Invoice successsfully'})

    } catch (error) {
        return res.status(500).json({message :  'Internal Server Error'}) 
    }
}

export {viewAll , view ,create , update , deleteInvoice}
