import { findUsers } from "../services/user.service.js"
import { uploaderImage } from "../utils/uploader-image.js"

export const getUsersForSidebar = async  (req, res) => {
  try {
    const loggedInUserId = req.user._id
    const filteredUsers = await findUsers(loggedInUserId)
    res.status(200).json({data: filteredUsers})
  } catch (error) {
    console.log('Erro buscar usuarios: ', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const {profilePic} = req.body
    const userId = req.user._id

    if(!profilePic) res.status(400).json({message: 'Imagem ivalida'})

    const imageUrl = await uploaderImage(profilePic)
    const updatedUser = await updateUser(userId, imageUrl)
    
    res.status(200).json({
      id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic
    })
  } catch (error) {
    console.log('Erro na atualização do usuario: ', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}