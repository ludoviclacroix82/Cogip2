import { DataTypes,Model } from "sequelize"
import sequelize from "../utils/db"
import {Request, Response} from "express";

class Type extends Model{

    public static getTypes = async (req: Request, res: Response ) =>{

        try {
            const types = await Type.findAll(
                {
                    order: [['name', 'Asc']],
                }
            )
            return types
        }catch (error) {
            console.error(error)
        }
    }

}

Type.init({
    id:{
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type:DataTypes.STRING,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },

},{
   sequelize,
   modelName: 'Type',
   tableName: 'types',
   timestamps: false, 
})

export default Type