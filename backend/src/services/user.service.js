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