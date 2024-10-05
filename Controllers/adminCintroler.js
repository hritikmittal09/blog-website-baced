
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
         const newPost = new Post({
            title : title,
            Image : onlineUrl? onlineUrl :"",
            comment : comment
         })
         await newPost.save()
 
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

export const deletePost = async (req, res) => {
    const id = req.params.id;

    try {
        // Find the post by its ID
        const postExst = await Post.findById(id);

        if (postExst) {
            let imageName = postExst.Image;

            // Extract the image name from the path
            imageName = imageName.split("/").pop();
            imageName = imageName.split(".").slice(0, 2).join(".");

            // Delete the image from online storage
            const result = await deleteImageFromOnline(imageName);

            if (result === "success") {
                // Delete the post from MongoDB
                await Post.findByIdAndDelete(id);

                return res.status(202).json({
                    message: "Post deleted successfully",
                });
            } else {
                return res.status(500).json({
                    message: "Internal server error",
                });
            }
        } else {
            return res.status(404).json({
                message: "Post with this ID not found",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
