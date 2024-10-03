// src/Controllers/CountryControllers
import { Request, Response } from 'express'
import Country from '../Models/CountryModels'

const { validatorCountry } = require('../utils/validator')

const viewAll = async (req: Request, res: Response) => {

    try {

        const countries = await new Country().getCountries(req, res)
        return countries

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

const view = async (req: Request, res: Response) => {

    try {
        const { id } = req.params
        const companyId = parseInt(id)

        const country = await new Country().getCountry(companyId, req, res)
        return country

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

const create = async (req: Request, res: Response) => {

    const { error, value } = validatorCountry(req.body)

    if (error) {
        return res.status(400).send(error.details)
    }

    const country = await new Country(
        value.name,
        value.initials,
    ).create(req, res)

    return country
}

const deleteCountry =  async ( req:Request , res:Response) =>{

    const {id} = req.params
    const countryId = parseInt(id)

    const country = await new Country().deleteCountry(countryId,req,res)

    return country

}

export { viewAll, view, create , deleteCountry }