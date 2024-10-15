// src/Controllers/TypesControllers
import { Request, Response } from 'express'
import Type from '../Models/TypeModels'

const viewAll = async (req: Request, res: Response) => {

    try {
        const types = await Type.getTypes(req,res) as any
        console.log('GET Types')
        return res.status(200).json({types : types})
    }catch (error: any) {
        console.error("Error fetching companies:", error)
        return res.status(500).json({ error: 'An error occurred while fetching companies' })
    }
}

export {viewAll}