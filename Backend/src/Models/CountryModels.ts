// src/Models/CountryModels.ts
import { Response, Request } from 'express'
import connectToDatabase from '../utils/connect'
import { Query } from 'mysql2/typings/mysql/lib/protocol/sequences/Query'
import { QueryResult } from 'mysql2'

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
    /**
     * Get All country in the coutry table
     * @param req 
     * @param res 
     * @returns datas countries
     */
    public getCountries = async (req: Request, res: Response):Promise<any> => {

        try {
            const query = `
                SELECT *
                FROM country
                ORDER BY name ASC`

            const [countries] = await this.pool.query(query)

            console.log('GET countries')
            return res.status(200).json({countries : countries})

        } catch (error) {
            console.error(error)
        }
    }

    public getCountry = async (id: number, req: Request, res: Response):Promise<any> => {
        try {

            const query = `
                SELECT *
                FROM country
                WHERE id = ?`

            const [country] = await this.pool.query(query, [id]) as any

            console.log(`GET Country id = ${id}`)

            if(country.length === 0)
                return res.status(400).json({message : "Country no found!"})

            return res.status(200).json({country:country})

        } catch (error) {
            console.error(error)
        }
    }

    public create = async (req: Request, res: Response):Promise<any> => {
        try {

            const isExistCountry = await this.isExist(this.initials,0) as any

            if( isExistCountry.length > 0)
                return res.status(409).json({message : "This country exist !"})

            const query = `
                INSERT 
                INTO country(name,initials,created_at,updated_at) 
                VALUES (?,?,?,?)`

            const [country] = await this.pool.query(query,[
                    this.name,
                    this.initials,
                    this.created_at,
                    this.updated_at ]
            )

            const data = {
                name : this.name,
                initials : this.initials,
                created_at : this.created_at,
                updated_at : this.updated_at
            }
            console.log(`POST Country ${this.name}`)
            

            return res.status(200).json({message : "Country create successfully " , data:data})

        } catch (error) {
            console.error(error)
        }
    }

    public deleteCountry = async (id: number, req: Request, res: Response):Promise<any> => {

        try {

            const isExistCountry =  await this.isExist('',id) as any
            
            if(isExistCountry.length === 0)
                return res.status(400).json({message : `the country id #${id} is not exist ! `})

            const query = `
                DELETE 
                FROM country
                WHERE id = ? `

            const [country] = await this.pool.query(query,[id])

            console.log(`DELETE Country id ${id}`)


            return res.status(200).json({message: 'Country deleted successfully !'})
            

        } catch (error) {
            console.error(error)
        }
    }

    public isExist = async (initials?: string,id?:number) => {

        try {
            const query = `
                SELECT name
                FROM country
                WHERE initials = ? OR id = ?`

            const [isExist] = await this.pool.query(query, [initials,id])
            return isExist
        } catch (error) {

        }
    }
}

export default Country