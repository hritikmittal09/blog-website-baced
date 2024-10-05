import 'dotenv/config'
import express from "express";
import adminRouter from "./routes/adminRouter.js"
import userRouter from './routes/UserRoute.js'
import bodyParser from "body-parser";
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectDb, connectMongodb, sequelize } from "./db/connectDb.js";
import authRouter from "./routes/authRouter.js";

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







const Port = process.env.Port||3000
app.listen(Port,async ()=>{
  await  connectMongodb()
  //const modelsCreated = await sequelize.sync()
  //console.log(modelsCreated);
  
  
  
    console.log("server is running....");
    
})