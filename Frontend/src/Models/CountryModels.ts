// src/Models/CountryModels

class Country{

    public id?: number
    public name?: string
    public initials?: string
    public created_at?:Date
    public updated_at?:Date

    constructor(id?: number, name?: string, initials?: string) {
        this.id = id
        this.name = name
        this.initials = initials
    }

    public  getCountry =  async (token:string) =>{

        try {

            const Url = import.meta.env.VITE_URL_API
            const response = await fetch(`${Url}/countries`,{
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            const json = await response.json()
            return json

        }catch(error){
            console.log(error)
        }

    }
}

export default Country