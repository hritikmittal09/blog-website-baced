
//import { json } from "body-parser";
import Post from "../models/Post.js"
export const createPost = async (req,res)=>{
    const title = req.body.title;
    const comment =(req.body.comment);
    console.log(req.body.title,comment);
    console.log(req.image);
    if (!title || !comment || !req.image) {
        res.status(400).json({
            message : "bad request"
        })
        
    }else{
        Post.create({
            title : title,
    comment : comment,
    Image : req.image        }
)

        res.status(201).json({
            message : "successfully created a post"
        })
    }

    
    
    
        
      
     

}