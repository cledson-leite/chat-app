export const createMessage =async  (text, image, receiver, sender) =>  {
  const imageUrl = image ? await uploaderImage(image) : ''
  const newMessage = Message.create({
    senderId,
    receiverId,
    text,
    image: imageUrl
  })
  await newMessage.save()

  return newMessage
}

export const findMessages = async (sender, receiver) => {
  const messages = await Message.find({
    $or: [
      {senderId: sender, receiverId: receiver},
      {senderId: receiver, receiverId:  sender},
    ]
  })
  return messages
}
