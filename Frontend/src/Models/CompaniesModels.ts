// src/Models/CompaniesModels

import { log } from "console"

class Company{

    public id?:number
    public name?:string
    public type_id?:number
    public country_id?:number
    public tva?:string
    public created_at?:Date
    public upadate_at?:Date

    constructor(id?:number,name?:string,type_id?:number,country_id?:number,tva?:string,created_at?:Date,upadate_at?:Date){
        this.id = id
        this.name = name
        this.type_id = type_id
        this.country_id = country_id
        this.tva = tva
        this.created_at = created_at 
        this.upadate_at = upadate_at
    }

    public getCompanies = async (limit: number , offset:number) =>{

        try {
            const Url = process.env.VUE_APP_URL_API
            const response = await fetch(`${Url}/companies/${limit}/${offset}`)

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }  
            const json = await response.json()          
            return json
        } catch (error) {
            console.log(error);
            
        }
    }
}
export default Company