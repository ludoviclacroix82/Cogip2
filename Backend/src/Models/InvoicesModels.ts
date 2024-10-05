// src/Models/InvoicesModels.ts
import { Request, Response } from "express"
import connectToDatabase from '../utils/connect'
import Companies from '../Models/CompanyModels'
import { log } from "console"

const { formatDate, generatorRef } = require('../utils/utils')


class Invoices {

    public ref?: string
    public company_id?: number
    public price?: number
    public created_at?: Date
    public updated_at?: Date


    public pool = connectToDatabase()

    constructor(company_id?: number, price?: number) {

        this.company_id = company_id
        this.price = price
        this.created_at = formatDate(new Date())
        this.updated_at = formatDate(new Date())
    }
    /**
     * Get all invoices
     * @param req 
     * @param res 
     * @returns all invoices
     */
    public getInvoices = async (req: Request, res: Response) => {

        try {

            const query = `
                SELECT invoices.*, companies.name as company
                FROM invoices
                JOIN companies ON invoices.company_id = companies.id
                ORDER BY ref ASC`

            const [invoices] = await this.pool.query(query)

            console.log('GET Invoices');

            return invoices

        } catch (error) {
            console.log(error)
        }
    }
    /**
     * View the invoice with ref
     * @param ref reference the invoice
     * @param req 
     * @param res 
     * @returns return data invoice 
     */
    public getInvoice = async (ref: string, req: Request, res: Response) => {

        try {

            const query = `
                SELECT *
                FROM invoices
                WHERE ref = ?`

            const [invoice] = await this.pool.query(query, [ref]) as any

            if (invoice.length === 0)
                return false

            console.log(`Get invoice ref: ${ref}`);

            return invoice

        } catch (error) {
            console.log(error)
        }
    }

    public postInvoice = async (req: Request, res: Response) => {
        try {

            let ref
            let isExistInvoice = true

            const [companies] = await new Companies().getCompany(this.company_id, req, res)

            while (isExistInvoice) {
                ref = generatorRef(companies.initials)
                isExistInvoice = await this.isExist(ref) as any
            }

            const query = `
            INSERT 
            INTO invoices(ref,company_id, created_at,updated_at,price) 
            VALUES (?,?,?,?,?)`

            const invoiceCreate = await this.pool.query(query, [
                ref,
                this.company_id,
                this.created_at,
                this.updated_at,
                this.price
            ])

            const data = {
                ref: ref,
                company_id: this.company_id,
                price: this.price,
                created_at: this.created_at,
                updated_at: this.updated_at,
            }

            return data

        } catch (error) {
            console.log(error);

        }
    }
    public updateInvoice = async (ref: string, data: any, req: Request, res: Response) => {
        try {

            const isExistInvoice = await this.isExist(ref)

            if (!isExistInvoice)
                return false

            data.updated_at = this.updated_at
            const fields = Object.keys(data).map(key => `${key} = ?`).join(', ')

            const query = `
                UPDATE invoices
                SET ${fields}
                WHERE ref = ?`

            const invoiceUpdate = await this.pool.query(query, [...Object.values(data), ref])

            return data

        } catch (error) {
            console.log(error)
        }
    }
    public isExist = async (ref?: string) => {

        try {

            const query = `
                SELECT ref
                FROM invoices
                Where ref = ?`

            const [invoice] = await this.pool.query(query, [ref]) as any

            console.log(invoice);

            if (invoice.lehght > 0)
                return true
            return false

        } catch (error) {
            console.log(error);

        }
    }
}

export default Invoices