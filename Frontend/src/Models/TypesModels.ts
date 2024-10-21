// src/Models/TypesModels
class Type {

    public id?: number
    public name?: string
    public created_at?:Date
    public update_at?:Date

    constructor(id?: number, name?: string) {
        this.id = id
        this.name = name
    }

    public getTypes =  async (token:string) =>{

        try {
            const Url = import.meta.env.VITE_URL_API
            const response = await fetch(`${Url}/types`,{
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

export default Type