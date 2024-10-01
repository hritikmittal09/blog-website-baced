import { DataTypes } from "sequelize";
//import { Sequelize } from "sequelize";
import { sequelize } from "../db/connectDb.js";
const user = sequelize.define("user",{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false,
    },
    name : DataTypes.STRING,
    password :  DataTypes.STRING,
    email :{ type : DataTypes.STRING,
        unique : true
        
    },

})
sequelize.sync(()=>{
    console.log();
    
})
export default user