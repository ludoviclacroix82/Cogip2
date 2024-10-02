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
    public getCountries = async (req: Request, res: Response):Promise<undefined|QueryResult> => {

        try {
            const query = `
                SELECT *
                FROM country
                ORDER BY name ASC`

            const [countries] = await this.pool.query(query)

            console.log('GET countries')
            return countries

        } catch (error) {
            console.error(error)
        }
    }

    public getCountry = async (id: number, req: Request, res: Response):Promise<undefined|QueryResult> => {
        try {

            const query = `
                SELECT *
                FROM country
                WHERE id = ?`

            const [country] = await this.pool.query(query, [id])

            console.log(`GET Country id = ${id}`)
            return country

        } catch (error) {
            console.error(error)
        }
    }

    public create = async (req: Request, res: Response):Promise<'isExist'|undefined|QueryResult> => {
        try {

            const isExistCountry = await this.isExist(this.initials,0)

            if (Array.isArray(isExistCountry) && isExistCountry.length > 0) {
                return 'isExist'
            }

            const query = `
                INSERT 
                INTO country(name,initials,created_at,updated_at) 
                VALUES (?,?,?,?)`

            const [country] = await this.pool.query(query,
                [this.name,
                this.initials,
                this.created_at,
                this.updated_at
                ]
            )
            console.log(`POST Country ${this.name}`)
            return country

        } catch (error) {
            console.error(error)
        }
    }

    public deleteCountry = async (id: number, req: Request, res: Response):Promise<'isNotExist'|undefined|QueryResult> => {

        try {

            const isExistCountry =  await this.isExist('',id)

            if (Array.isArray(isExistCountry) && isExistCountry.length === 0) {
                return 'isNotExist'               
            }

            const query = `
                DELETE 
                FROM country
                WHERE id = ? `

            const [country] = await this.pool.query(query,[id])

            console.log(`DELETE Country id ${id}`);
            

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