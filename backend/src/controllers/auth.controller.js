import bcrypt from 'bcryptjs'

import User from '../models/user.model.js'
import { generateToken } from '../../utils/generate-token.js'
import { paramsValidate } from '../../utils/user-validation.js'
import { createUser } from '../services/user.service.js'

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

export const login = (req, res) => {
  res.send('login route')
}

export const logout = (req, res) => {
  res.send('logout route')
}