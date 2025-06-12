import jwt from 'jsonwebtoken'

export const generateToken = (id, res) => {
  const token =jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.cookie('token', token, {
    httpOnly: true, //previne ataquesn XSS (cross-site-scripting)
    secure: process.env.NODE_ENV !== 'development', //https ou http
    sameSite: 'strict', //previne ataques CSRF (cross-site-request-forgery)
    maxAge: 7 * 24 * 60 * 60 * 1000, //expira em 7 dias em milisegundos
  })
  return token
}