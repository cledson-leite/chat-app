import  jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const prodectedRoute = async  (req, res, next) => {
  try {
    const token = req.cookies.token
    if(!token) return res.status(401).json({message: 'Não autorizado. Token invalido'})
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(!decoded) return res.status(401).json({message: 'Não autorizado. Token invalido'})
      const user = await User.findById(decoded.id).select('-password')
    if(!user) return res.status(401).json({message: 'Não autorizado. Token invalido'})
      req.user = user
      next()
    } catch (error) {
      console.log('Erro ao acessar Token: ', error.message)
      res.status(500).json({ message: 'Internal Server Error' })
    }
}