
import { where } from "sequelize"
import { data } from "../data/data.js"
import Post from "../models/Post.js"
export const  userControllerworks = (req, res) =>{
    res.status(200).json({
        "message" : "user works"
    })
}



export const  getdata = async(req, res) =>{
    const p =await Post.findAll()
    
    res.status(200).json({
        "message" : "success",
        data : p 
    })
}

export const  findProductById = async(req, res) =>{
    const id = req.params.id
    
    try {
        const p =await Post.findAll({where : {id : id}})
        if (p.length == 0) {
            res.status(404).json({
                "message" : "product not found ",
                
            })
            
        } else {
            res.status(200).json({
                "message" : "success",
                data : p[0] 
            })
            
        }
        
        
       
    } catch (error) {
        res.status(500).json({
            "message " : ""
        })
        
    }
}