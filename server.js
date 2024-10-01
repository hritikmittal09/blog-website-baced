import express from "express";
import adminRouter from "./routes/adminRouter.js"
import userRouter from './routes/UserRoute.js'
import bodyParser from "body-parser";
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectDb, sequelize } from "./db/connectDb.js";
import authRouter from "./routes/authRouter.js";
import 'dotenv/config'
const __filename = fileURLToPath(import.meta.url);
import cors from 'cors';
import helmet from "helmet";

// Get the directory name
const __dirname = dirname(__filename);


const app = express()
app.use(cors( {
    origin : "*",
    credentials : true
} ))
app.use(helmet())



app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); 
app.set("views", path.join(__dirname))
app.set("view engine", "ejs")
app.use("/auth",authRouter )
app.use('/admin',adminRouter)
app.use('/user',userRouter)



app.use((req,res)=>{
    res.send("page not Found")

})




app.listen(3000,async ()=>{
  await  connectDb()
  //const modelsCreated = await sequelize.sync()
  //console.log(modelsCreated);
  
  
  
    console.log("server is running....");
    
})