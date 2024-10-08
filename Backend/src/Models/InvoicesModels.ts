import { Sequelize, DataTypes, Model } from 'sequelize'
import { Request, Response } from 'express'
import sequelize from '../utils/db'

const { generatorRef } = require('../utils/utils')

class Invoice extends Model {

    public getInvoices = async (limit: number, offset: number, req: Request, res: Response) => {

        try {
            const invoices = await Invoice.findAll({
                limit: limit,
                offset: offset,
                order: [['created_at', 'DESC']],
            })
            return invoices
        } catch (error) {
            console.log(error)
        }
    }

    public getInvoice = async (ref: string, req: Request, res: Response) => {

        try {
            const invoice = await Invoice.findOne({ where: { ref } }) as any
            console.log(invoice);

            return invoice

        } catch (error) {
            console.log(error)
        }

    }

    public postInvoice = async (data: object, req: Request, res: Response) => {

        try {
            let ref = generatorRef('F')
            const invoiceCreate = await Invoice.create({ ...data, ref })
            return invoiceCreate

        } catch (error) {
            console.log(error)

        }
    }

    public updateInvoice = async (ref: string, data: any, req: Request, res: Response) => {
        try {
            const invoiceUpdate = await Invoice.update(
                { ...data},
                {where: {ref}},
            )
            return invoiceUpdate
        } catch (error) {
            console.log(error)
        }
    }

    public deleteInvoice = async (ref:string , req:Request , res:Response) =>{

        try {
            const invoiceDelete = await Invoice.destroy({where : {ref}})
            return invoiceDelete
            
        } catch (error) {
            console.log(error)
            
        }
    }
}

Invoice.init({

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ref: {
        type: DataTypes.STRING,
    },
    company_id: {
        type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.NUMBER
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },

},
    {
        sequelize,
        modelName: 'Invoice',
        tableName: 'invoices',
        timestamps: false,
    },
)

export default Invoice