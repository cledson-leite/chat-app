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
      { senderId: mongoose.Types.ObjectId(sender), receiverId: mongoose.Types.ObjectId(receiver) },
      { senderId: mongoose.Types.ObjectId(receiver), receiverId: mongoose.Types.ObjectId(sender) },
    ]
  })
  return messages
}
