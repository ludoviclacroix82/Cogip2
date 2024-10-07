// src/Models/invoicesModels


class Invoice {

    public id?:number
    public ref?:string
    public company_id?:number
    public company?:string
    public price?:number
    public created_at?:Date
    public upadate_at?:Date

    constructor(id?:number,ref?:string,company_id?:number,company?:string,price?:number,created_at?:Date,upadate_at?:Date) {
        this.id = id
        this.ref = ref
        this.company_id = company_id
        this.company = company
        this.price = price
        this.created_at = created_at
        this.upadate_at = upadate_at
    }


    public getInvoices =  async (limit: number , offset:number) =>{

        try {   
            
            const response = await fetch(`http://localhost:3000/invoices/${limit}/${offset}`)                    
                       
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }          
              const json = await response.json()
              return json

        } catch (error) {
            console.log(error)
            
        }
    }
}

export default Invoice