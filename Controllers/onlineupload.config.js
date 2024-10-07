import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from 'fs/promises';

import path from "path"
cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.cloud_api_key, 
    api_secret: process.env.coud_secrect_key // Click 'View API Keys' above to copy your API secret
});

export async function onlineUpload(imagepath) {

    // Configuration
   
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           `${imagepath.path}`, {
               public_id: `${imagepath.filename}`,
           }
       )
       
       .catch((error) => {
           console.log(error);
       });
    
    //console.log(uploadResult)
    try {
        await fs.unlink(imagepath.path);
        console.log('File deleted from local sever successfully');
    } catch (err) {
        console.error('Error deleting the file:', err);
    }
    return uploadResult.secure_url
}
export const deleteImageFromOnline = async (imageName)=>{
    //console.log(imageName,"call from delete fucton fom online");
    
    try {
       await cloudinary.uploader.destroy(imageName,(err,result)=>{
        console.log(err);
        console.log(result);
        
        

       })
       return "success"
    } catch (error) {
        console.log(error);
        //console.log(process.env.cloud_api_key);
        
        
        
        
        
    }
}