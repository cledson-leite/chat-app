export const paramsValidate = ({ fullName, email, password }) => {
  if(!fullName || !email || !password) return  'Todos os campos devem ser preenchidos'
  if(password.length < 6)  return'Senha deve ser maior que 6 digitos' 
  return null
}