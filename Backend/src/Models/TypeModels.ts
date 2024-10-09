import { DataType,DataTypes,Model } from "sequelize"
import sequelize from "../utils/db"

class Type extends Model{

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