// src/Models/CompaniesModels
class Company{

    public id?:number
    public name?:string
    public type_id?:number
    public country_id?:number
    public tva?:string
    public created_at?:Date
    public update_at?:Date

    private UrlApi = import.meta.env.VITE_URL_API

    constructor(id?:number,name?:string,type_id?:number,country_id?:number,tva?:string,created_at?:Date,update_at?:Date){
        this.id = id
        this.name = name
        this.type_id = type_id
        this.country_id = country_id
        this.tva = tva
        this.created_at = created_at 
        this.update_at = update_at
    }

    public getCompanies = async (limit: number , offset:number) =>{

        try {
            const response = await fetch(`${this.UrlApi}/companies/${limit}/${offset}`)

            if (!response.ok) throw new Error(`Response status: ${response.status}`)

            const json = await response.json()          
            return json
        } catch (error) {
            console.log(error)
        }
    }

    public getCompany  = async (id:number) =>{
        try {
            const response = await fetch(`${this.UrlApi}/companies/${id}`)

            if (!response.ok) throw new Error(`Response status: ${response.status}`)

            const json = await response.json()
            return json
        } catch (error) {
            console.log(error)
        }
    }

    public postCompany = async (data:object):Promise<boolean|object> =>{

        try {
            const response:object = await fetch(`${this.UrlApi}/companies`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            return response
        }catch (error) {
            console.log(error)
        }
    }

    public patchCompany = async (id:number,data:object):Promise<boolean|object> =>{

        try {
            const response:object = await fetch(`${this.UrlApi}/companies/${id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            return response
        }catch (error) {
            console.log(error)
        }
    }
}
export default Company