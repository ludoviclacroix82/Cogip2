// src/Controllers/CountryControllers
import {Request , Response} from 'express'
import Country from '../Models/CountryModels'

const viewAll =  async (req:Request , res:Response) => {

    try {
        
        const country = await new Country().getCountries(req,res)

        const datas = {
            countries : country
        }

        res.status(200).json(datas)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })        
    }

}

export {viewAll}