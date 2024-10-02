// src/Controllers/CountryControllers
import { Request, Response } from 'express'
import Country from '../Models/CountryModels'

const { validatorCountry } = require('../utils/validator')

const viewAll = async (req: Request, res: Response) => {

    try {

        const countries = await new Country().getCountries(req, res)
        const datas = {
            countries: countries
        }
        res.status(200).json(datas)

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

        res.status(200).json(country)

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

    if(country === "isExist")
        return res.status(409).json({ error: "Le pays existe déjà !" })
    
    return res.status(201).json({ message: 'Country created successfully', data: value })
}

const deleteCountry =  async ( req:Request , res:Response) =>{

    const {id} = req.params
    const countryId = parseInt(id)

    const country = await new Country().deleteCountry(countryId,req,res)

    if(country === "isNotExist" )
            return res.status(400).json({message : `the country id #${id} is not exist ! `})

    return res.status(200).json({message: 'Country deleted successfully !'})
}

export { viewAll, view, create , deleteCountry }