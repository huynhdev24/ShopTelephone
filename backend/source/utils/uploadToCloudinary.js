import cloudinary from 'cloudinary'
import path from 'path'
import fs from 'fs'
// locaFilePath: path of image which was just
// uploaded to "uploads" folder

async function uploadToCloudinary(locaFilePath) {

    // filePathOnCloudinary: path of image we want
    // to set when it is uploaded to cloudinary
    var mainFolderName = "image";
    var filePathOnCloudinary = path.join(mainFolderName, locaFilePath)
    var pathImageCloud = filePathOnCloudinary.replaceAll("\\", "/");

    return cloudinary.v2.uploader.upload(locaFilePath, { public_id: pathImageCloud })
        .then((result) => {

            // Image has been successfully uploaded on
            // cloudinary So we dont need local image 
            // file anymore
            // Remove file from local uploads folder
            fs.unlinkSync(locaFilePath);

            return {
                message: "Success",
                url: result.url,
            };
        })
        .catch((error) => {

            // Remove file from local uploads folder
            fs.unlinkSync(locaFilePath);
            return { message: "Fail" };
        });
}

export { uploadToCloudinary }