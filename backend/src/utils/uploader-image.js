import cloudinary from '../lib/cloudinary.js'

export const uploaderImage = async (image) => {
  const uploadResponse = await cloudinary.uploader.upload(image)
  return uploadResponse.secure_url
}