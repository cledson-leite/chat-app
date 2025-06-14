import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const createUser = async ({ fullName, email, password }) => {
  const isExist = await User.findOne({ email })
  if (isExist) {
    return { message: 'Usuario ja existe no sistema' }
  }
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  const newUser = await User.create({ fullName, email, password: hashPassword })
  await newUser.save()
  return {data: newUser}
}
export const loginUser = async ({ email, password }) => {

  const user = await User.findOne({ email })
  if (!user || !password) return { message: 'Credenciais invalidas' }

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword)  return { message: 'Credenciais invalidas' }
  return {data: user}
}

export const findUsers = async (loggedInUserId) => {
  const users = await User.find({_id: {ne: loggedInUserId}}).select('-password')
  return users
}

export const updateUser = async (id, imageUrl) => {
  const user = await User.findByIdAndUpdate(id, {profilePic: imageUrl}, {new:true})
  return user
}