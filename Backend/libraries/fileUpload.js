require('dotenv').config();
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2

class fileUpload{
    constructor(){
        cloudinary.config({
            cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
            api_key:process.env.CLOUDINARY_API_KEY,
            api_secret:process.env.CLOUDINARY_API_SECRET,
            
        })
    }
    storage(){
        return new CloudinaryStorage({
            cloudinary: cloudinary,
            params: async (req, file) => {
              const fileType = file.mimetype.split("/")[0]; // Extract type from mimetype (image/pdf)
              return {
                folder: fileType === "image" ? "image_uploads" : "pdf_uploads",
                resource_type: 'auto', // Use "raw" for PDFs
                format: fileType === "image" ? "png" : "pdf", // Convert images to PNG, keep PDFs
                // public_id: file.originalname.split(".")[0], // Use file name as public_id
              };
            },
          });
    }
    upload(image,callback){
        cloudinary.uploader.upload(image).then(result=>{
            callback(result)
            return result
        })
    }
}


module.exports = fileUpload

