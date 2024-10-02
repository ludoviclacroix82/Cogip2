// src/Models/CountryModels.ts
import { Response, Request } from 'express'
import connectToDatabase from '../utils/connect'

const { formatDate } = require('../utils/utils')

class Country {
    public name?: string
    public initials?: string
    public created_at?: Date
    public updated_at?: Date

    public pool = connectToDatabase()

    constructor(name?: string, initials?: string,) {
        this.name = name
        this.initials = initials
        this.created_at = formatDate(new Date())
        this.updated_at = formatDate(new Date())
    }

    public getCountries = async (req:Request , res:Response) =>{

        try {

            const query = `
                SELECT *
                FROM country
                ORDER BY name ASC`

            const country = await this.pool.query(query)

            console.log('GET countries')
            
            return country
            
        } catch (error) {
            console.error(error)           
        }
    }
}

export default Country