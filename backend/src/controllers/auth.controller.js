import bcrypt from 'bcryptjs'

import User from '../models/user.model.js'
import { generateToken } from '../../utils/generate-token.js'
import { paramsValidate } from '../../utils/user-validation.js'
import { createUser, loginUser } from '../services/user.service.js'

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body
  try {
    const validate = paramsValidate({ fullName, email, password })
    if(validate) return res.status(400).json({ message: validate })
    const newUser = await createUser({ fullName, email, password })
    if(newUser.message) return res.status(400).json({ message: newUser.message })
    generateToken(newUser._id, res)
    return res.status(201).json({ 
      id: newUser.data._id,
      fullName: newUser.data.fullName,
      email: newUser.data.email,
      profilePic: newUser.data.profilePic
     })
  } catch (error) {
    console.log('Erro na registro do novo usuario: ', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const login = async (req, res) => {
  try {
    const user = await loginUser(req.body)
    if(user.message) return res.status(400).json({ message: user.message })
    generateToken(user.data._id, res)
    return res.status(200).json({
      id: user.data._id,
      fullName: user.data.fullName,
      email: user.data.email,
      profilePic: user.data.profilePic
    })
  } catch (error) {
    console.log('Erro no login do usuario: ', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
export const logout = (req, res) => {
  try {
    res.cookie('token', '', {maxAge: 0})
    return res.status(200).json({ message: 'Logout realizado com sucesso' })
  } catch (error) {
    console.log('Erro no loginout do usuario: ', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}