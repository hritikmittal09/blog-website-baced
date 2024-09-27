import user from "../models/user.js"
import jwt from 'jsonwebtoken';
const secretKey = 'your-secret-key';
export const registerController = async (req, res) =>{
    const body = req.body
    if (!body.name || ! body.email) {
        
        
        res.status(401).json({
            "message" : "bad request"

        })
        
    }else{
        const userexist = await user.findAll({where : {email : body.email }})
        const muser = await user.findAll()
        
        try {
            if (userexist.length ==0) {
                user.create({
                    name : body.name,
                    email : body.email
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

    let email  = req.body.email
    let name  = req.body.name
    let userId = req.body.id 
    if (!name || !email) {
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
    
    
       const payload = {email ,name, userId :userexist[0].id}
       const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        res.status(200).json({
        success : true,
        user : userexist[0],
        token : token,
    })
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