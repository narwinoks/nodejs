import base64Img from "base64-img";
import isBase64 from "is-base64";

const processBase64Image = (imageData) => {
  //CHECK VALID BASE64 IMAGES
  if (!isBase64(imageData, { mimeRequired: true }))
    return { status: 200, success: false, message: "Invalid Base64 image" };
  //MOVE IMAGE TO PUBLIC DIRECTORY
  const moveMedia = base64Img.imgSync(imageData, "./public/images", Date.now());
  const fileName = moveMedia.split("/").pop();
  return fileName;
};

export default processBase64Image;
