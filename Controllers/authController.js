import user from "../models/user.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const secretKey = "1233444555"
export const registerController = async (req, res) =>{
    const body = req.body
    if (!body.name || ! body.email ||!body.password) {
        
        
        res.status(401).json({
            "message" : "bad request"

        })
        
    }else{
        const userexist = await user.findAll({where : {email : body.email }})
        const muser = await user.findAll()
        
        try {
            if (userexist.length ==0) {
                const hashedPassword = await bcrypt.hash(body.password, 10);
                user.create({
                    name : body.name,
                    email : body.email,
                    password : hashedPassword
                })
               res.status(201).json({
                "message" : "user created"
               })
                
            } else {
                res.status(401).json({
                    message : "user already exist"
                })
    
                
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message : "something went wrong"
            })

            
            
        }
        
    }

}



export const  loginControllr   =async (req,res)=>{
    console.log(secretKey);
    

    let email  = req.body.email
    let name  = req.body.name
    let enteredpassword = req.body.password
    let userId = req.body.id 
    if (!name || !email || !enteredpassword) {
        console.log(enteredpassword);
        
        res.status(401).json({
            message : "bad request"
        })
    }
    else{
        const userexist = await user.findAll({where : {email : email}})
        if (userexist.length==0) {
            res.status(401).json({
                success : false,
                message : "user not exist"
            })
            return
        }
    
    
        const passwordMatch = await bcrypt.compare(enteredpassword,userexist[0].password );
        if (!passwordMatch) {
           res.status(401).json({
                success : false,
                message : "password incorrect!"
            })
            
        } else {
        const payload = {email ,name, userId :userexist[0].id}
       const userInfo = { "email": userexist[0].email, "name": userexist[0].name,"userId": userexist[0].id}

       
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        res.status(200).json({
        success : true,
        user : userInfo,
        token : token,
    })
        }
        
    }
    

}
export const loginCheck = (req,res,next)=>{
    let token = req.get("auth");
    

    
    
    if (token == undefined  ) {
        res.status(401).json({
            success :false,
            message : "unauthorized"
        })
        return
        
    }
    try {
        let decodedToken =jwt.verify(token,secretKey)
        if (decodedToken) {
           // console.log(decodedToken);
            next()
            
        }else{
            res.status(401).json({
                success : false, 
                message : "unauthorized"
            })
        }
    } catch (error) {
        res.status(401).json({
            success : false,
            message: "token expires"
        })
        
    }

   
    

}