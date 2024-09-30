// src/Models/CompanyModdels

class Companies {
    public id: number
    public name: string
    public type_id: number
    public country_id: number
    public tva: string
    public created_at:Date
    public updated_at:Date

    constructor(id: number,name: string,type_id: number,country_id: number,tva: string,created_at:Date,updated_at:Date) {
        this.id = id 
        this.name = name
        this.type_id = type_id
        this.country_id = country_id
        this.tva = tva
        this.created_at = created_at
        this.updated_at = updated_at
    }

   public getCompanies = async() =>{

    
   }


}