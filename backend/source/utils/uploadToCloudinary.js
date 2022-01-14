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

    let result = filePathOnCloudinary.includes("\\");
    if (result) {
        var pathImageCloud = filePathOnCloudinary.replaceAll("\\", "/");
    } else {
        var pathImageCloud = filePathOnCloudinary
    }

    pathImageCloud = pathImageCloud.split(".")[0]

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

async function deleteFileInCloudinary(imageUrl) {
    let nameArray = imageUrl.split("/")
    let nameImage = nameArray[nameArray.length - 1]
    nameImage = nameImage.split(".")[0]
    let pathImageCloud = path.join("image", "uploads", nameImage)

    let result = pathImageCloud.includes("\\");
    if (result) {
         pathImageCloud = pathImageCloud.replaceAll("\\", "/")
    } 

    return cloudinary.v2.uploader.destroy(pathImageCloud)
        .then((result) => {
            return {
                message: "Success",
            };
        })
        .catch((error) => {
            return { message: "Fail" };
        });
}

export { uploadToCloudinary, deleteFileInCloudinary }