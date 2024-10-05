
//import { json } from "body-parser";
import Post from "../models/Post.js"
import { delereImageFromOnline, onlineUpload } from "./onlineupload.config.js";
export const createPost = async (req, res) => {
    const title = req.body.title;
    const comment = (req.body.comment);
    const image = req.file;
    //console.log(req.body.title, comment);
    //console.log(req.file);
    if (!title || !comment || !req.image) {
        res.status(400).json({
            message: "bad request"
        })

    } else {
       try {
      let onlineUrl = await onlineUpload(image)
         Post.create({
             title: title,
             comment: comment,
             Image: onlineUrl ? onlineUrl : null
         })
 
         res.status(201).json({
             message: "successfully created a post"
         })
       } catch (error) {
        console.log(error);
        
        
        res.status(500).json({
            message : "internal  server error" 
        })
        
       }
    }



}
export const deletePost = async (req,res)=>{
    const id = req.params.id
    const postExst = await Post.findAll({where :{id : id}})
    if (postExst.length !=0) {
        let imageNane = postExst[0].Image
       // console.log(imageNane);
        
        imageNane = imageNane.split("/")
        //console.log(imageNane);
        
        imageNane = imageNane[imageNane.length-1]
        
        imageNane = imageNane.split(".")
        imageNane = imageNane[0]+ "."+imageNane[1]
        const result = await delereImageFromOnline(imageNane)
        if (result == "success") {
           await Post.destroy({where :{iD :id}})
           res.status(202).json({
            message : "post deleted sucssfully"
           })
            
        }else{
            res.status(500).jsom({
                message : "internal server error"
            })
        }
        
    } else {
        res.status(404).json({
            message : "post with this id not found"
        })
        
    }
    
}
