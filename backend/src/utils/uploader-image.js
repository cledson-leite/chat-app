import cloudinary from '../lib/cloudinary.js'

export const uploaderImage =  (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {resource_type: 'image'},
      (error, result) => {
        if(error) reject(error)
        resolve(result.secure_url)
      }
    ).end(image.buffer)
  })
}