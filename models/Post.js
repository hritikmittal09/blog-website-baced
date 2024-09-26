import { DataTypes } from "sequelize";
//import { Sequelize } from "sequelize";
import { sequelize } from "../db/connectDb.js";
const Post = sequelize.define("Post",{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false,
    },
    title : DataTypes.STRING,
    comment : DataTypes.STRING,
    Image : DataTypes.STRING
})
sequelize.sync(()=>{
    console.log("post table created");
    
})
export default Post