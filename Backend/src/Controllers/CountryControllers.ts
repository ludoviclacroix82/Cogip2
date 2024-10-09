// src/Controllers/CountryControllers
import { Request, Response } from 'express'
import Country from '../Models/CountryModels'

const { validatorCountry } = require('../utils/validator')

const viewAll = async (req: Request, res: Response) => {

    try {
        const countries = await Country.getCountries(req, res)

        console.log('GET countries')
        return res.status(200).json({ countries: countries })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

const view = async (req: Request, res: Response) => {

    try {
        const { id } = req.params

        const country = await Country.getCountry(parseInt(id), req, res) as any

        if (country === null) return res.status(400).json({ message: "Country no found!" })

        console.log(`GET Country id = ${id}`)
        return res.status(200).json({ country: country })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

const create = async (req: Request, res: Response) => {

    const { error, value } = validatorCountry(req.body)   

    if(error) return res.status(400).send(error.details)
    
    const country = await Country.postCountry(value,req,res) 

    if (country == null) return res.status(409).json({ message: "This country exist !" })

    console.log(`POST Country ${value.name}`)
    return res.status(200).json({ message: "Country create successfully ", data: country })
}

const deleteCountry = async (req: Request, res: Response) => {

    const { id } = req.params

    const country = await Country.deleteCountry(parseInt(id), req, res)

    if (country == null)
        return res.status(400).json({ message: `the country id #${id} is not exist ! ` })
    
    console.log(`DELETE Country id ${id}`)
    return res.status(200).json({ message: 'Country deleted successfully !' })
}

export { viewAll, view, create, deleteCountry }