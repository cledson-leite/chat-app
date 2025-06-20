import Message from '../models/message.model.js'
import { uploaderImage } from '../utils/uploader-image.js'

export const createMessage =async  (text, image, receiverId, senderId) =>  {
  const imageUrl = image ? await uploaderImage(image) : ''
  const newMessage = await Message.create({
    senderId,
    receiverId,
    text,
    image: imageUrl
  })
  return newMessage
}

export const findMessages = async (sender, receiver) => {
  const messages = await Message.find({
    $or: [
      { senderId: sender, receiverId: receiver},
      { senderId: receiver,  receiverId: sender},
    ]
  })
  return messages
}
