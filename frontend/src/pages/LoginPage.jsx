import {useState} from 'react'
import {Link} from 'react-router-dom'
import toaster from 'react-hot-toast'
import { useAuthStore } from '../stores/useAuthStore'
import { LuMessageSquareDiff, LuLoaderCircle } from "react-icons/lu"
import { FaUserAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import AuthImagePattern from '../components/AuthImagePattern'

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false)
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    })
    const {login, isLoggingIn} = useAuthStore()
    const valiteForm = () => {
      if(!formData.email.trim() || !formData.password.trim()) {
        return toaster.error('Todos os campos devem ser preenchidos')
      }
      if(!/\S+@\S+\.\S+/.test(formData.email)) return toaster.error('Email invalido')
      if(formData.password.length < 6)  return toaster.error('Senha deve ser maior que 6 digitos')
        return true
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      const success = valiteForm()
      if(success) login(formData)
    }
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          <div className="text-center md-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group:hover:bg-primary/20 transition-colors">
                <LuMessageSquareDiff className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Criar Conta</h1>
              <p className="text-base-content/60">Inicie sua conta gratuita</p>
              </div>
            </div>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label mb-2">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <input 
                  className="input input-bordered w-full pl-10" 
                  type="email" 
                  placeholder="seu@email.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MdEmail className="size-5 text-base-content/40"/>
                </div>
              </div>
            </div>
            <div className="form-control">
              <label className="label mb-2">
                <span className="label-text font-medium">Senha</span>
              </label>
              <div className="relative">
                <input 
                  className="input input-bordered w-full pl-10" 
                  type={showPass ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="size-5 text-base-content/40"/>
                </div>
                <button 
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
                >
                    {
                      showPass ? (
                        <FaEyeSlash  className="size-5 text-base-content/40" />
                      ) : (
                        <FaEye className="size-5 text-base-content/40" />
                      )
                    }
                </button>
              </div>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-full" 
              disabled={isLoggingIn}
            >{
              isLoggingIn 
              ? ( 
                  <>
                    <LuLoaderCircle className="size-5 animate-spin" />
                    Carregando... 
                  </>
                )
              : 'Entrar'
            }</button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Ainda não possui uma conta? {' '}
              <Link to="/signup" className="link link-primary">Signup</Link>
            </p>
          </div>
          </div>
        </div>
        <AuthImagePattern
          title= 'Bem-vindo de volta'
          subtitle= 'Conecte-se com amigos e compartilhe suas momentos.'
         />
      </div>
  )
}
