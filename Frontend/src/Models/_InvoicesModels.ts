import  { Sequelize, DataTypes, Model }  from 'sequelize'
const sequelize = new Sequelize()

class Invoice extends Model {

    public getInvoices = async () =>{

        try {
            
            
        } catch (error) {
            console.log(error)
            
        }

    }

}

    Invoice.init({

        id:{
            type: DataTypes.INTEGER,
        },
        ref: {
            type: DataTypes.STRING,
        },
        company_id:{
            type: DataTypes.INTEGER,
        },
        company:{
            type: DataTypes.STRING
        },
        price:{
            type: DataTypes.NUMBER
        },
        created_at:{
            type: DataTypes.DATE
        },
        upadate_at:{
            type: DataTypes.DATE
        }
    },
    {
    sequelize, 
    modelName: 'Invoice', 
    },
)