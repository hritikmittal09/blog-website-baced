import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';

import path from "path"

export async function onlineUpload(imagepath) {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'drgrkk7ml', 
        api_key: '291429856423827', 
        api_secret: 'x5RnMjJmjM-hb-IAKO4GhN2XTxU' // Click 'View API Keys' above to copy your API secret
    });
    
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