import {useState} from 'react'
import { FaCameraRetro } from "react-icons/fa"
import { FaUserAlt } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { useAuthStore } from '../stores/useAuthStore'

export default function ProfilePage() {
  const {authUser, isUpdatingProfile, updateProfile} = useAuthStore()
  const [selectedImage, setSelectedImage] = useState(null)
  const handleImageUpdate = async (e) => {
    const file = e.target.files[0]
    if(!file) return
    
    const formData = new FormData()
    formData.append('profilePic', file)

    const preview = URL.createObjectURL(file)
    setSelectedImage(preview)
    await updateProfile(formData)
    }
  const formateDate = (date) => {
    if(!date) return
    return new Date(date.split('T')[0]).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }
  return (
    <div className='h-screen pt-20'>
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Perfil</h1>
            <p className="mt-2">Suas informações de perfil</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img src={selectedImage || authUser.profilePic} alt="Avatar" className="size-32 rounded-full object-cover border-4" />
              <label htmlFor="avatar-upload" className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full  cursor-pointer transition-all duration-200 ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''}`}>
                <FaCameraRetro  className="w-5 h-5 text-base-200"/>
                <input 
                  type="file" 
                  id="avatar-upload" 
                  className="hidden" 
                  disabled={isUpdatingProfile} 
                  onChange={handleImageUpdate}/>
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? 'Atualizando...' : 'Clique aqui para atualizar a imagem de perfil'}
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2 mb-4">
                <FaUserAlt className="w-4 h-4" />
                Meu nome
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser.fullName}</p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2 mb-4">
                <MdEmail className="w-4 h-4" />
                Meu email
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser.email}</p>
            </div>
          </div>
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Informações da conta</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Membro deste: </span>
                <span>{formateDate(authUser.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Status da conta</span>
                <span className="text-green-500">Ativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
