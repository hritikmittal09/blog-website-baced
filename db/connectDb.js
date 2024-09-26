import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: 'sqlite',
   storage: './database.db'
   
})
export const connectDb = async ()=>{
   
    try {
        await sequelize.authenticate();
        await sequelize.sync({force : false})
        console.log("connect to db");
        
    } catch (error) {
        console.log("fail to connect to db");
        
    }
} 
