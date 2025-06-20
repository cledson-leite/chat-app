import cloudinary from '../lib/cloudinary.js'

import User from '../models/user.model.js'
import Message from '../models/message.model.js'
import { createMessage, findMessages } from '../services/message.service.js'



export const getMessages = async (req, res) => {
  try {
    const {id: userToChatId} = req.params
    const myId = req.user._id
    const messages = await findMessages(myId, userToChatId)
    res.status(200).json({data: messages})
  } catch (error) {
    console.log('Erro buscar mensagens: ', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const sendMessage = async (req, res) => {
  try {
    const {text} = req.body
    const image = req.file
    const {id: receiverId} = req.params
    const senderId = req.user._id

    
    const newMessage = await createMessage(text, image, receiverId, senderId)

    //todo: enviar notificacao com socket.io

    res.status(201).json({data: newMessage})
  } catch (error) {
    console.log('Erro ao enviar mensagem: ', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}