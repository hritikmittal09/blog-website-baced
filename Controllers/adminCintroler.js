
//import { json } from "body-parser";
import Post from "../models/Post.js"
import { onlineUpload } from "./onlineupload.config.js";
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