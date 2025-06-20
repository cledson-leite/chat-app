import {useState, useRef} from 'react'
import { useChatStore } from '../stores/useChatStore'
import toast from 'react-hot-toast'
import { MdCancel } from "react-icons/md"
import { FaImage } from "react-icons/fa6"
import { IoIosSend } from "react-icons/io"

export default function MessageInput() {
  const [text, setText] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const fileInputRef = useRef()
  const {sendMessage} = useChatStore()

  const handleImageChange = async e => {
    const file = e.target.files[0]
    if(!file.type.startsWith('image/')) {
      toast.error('Por favor escolha um arquivo de imagem')
      return
    }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview(null)
    if(fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSendMessage = async e => {
    e.preventDefault()
    if(!text.trim() && !imagePreview) return
    try {
      const formData = new FormData()
      formData.append('text', text.trim())
      if(imageFile) formData.append('image', imageFile)
      await sendMessage(formData)
      setText('')
      removeImage()
    } catch (error) {
      console.log("Erro ao enviar mensagem: ", error.message)
    }
  }
  return (
    <div className="p-4 w-full">
      {
        imagePreview && (
          <div className="mb-3 flex items-center gap-2">
            <div className="relative">
              <img
                src={imagePreview} 
                alt="Preview" 
                className="w-20 h-20 objext-cover rounded-lg border border-zinc-700" 
              />
              <button 
                className="absolute -top-1.5 w-5 h-5 rouded-full bg-base-300 flex items-center justify-center"
                type="button"
                onClick={removeImage}
              >
                <MdCancel className="w-3 h-3" />
              </button>
            </div>
          </div>
        )
      }
      <form 
        onSubmit={handleSendMessage} 
        className="flex items-center gap-2">
          <div className="flex-1 flex gap-2">
            <input 
              type="text" 
              className="w-full input input-bordered rounded-lg input-sm sm:input-md" 
              placeholder="Digite uma mensagem"
              value={text}
              onChange={e => setText(e.target.value)}
              />
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleImageChange}
              />
              <button 
                className={`hidden sm:flex btn btn-circle 
                  ${imagePreview ? 'text-emerald-500' : 'text-zinc-400'}`}
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FaImage size={20} />
              </button>
          </div>
              <button 
                className= 'hidden sm:flex btn btn-circle'
                  type="submit"
                  disabled={!text.trim() && !imagePreview}
                  // onClick={() => fileInputRef.current?.click()}
                >
                  <IoIosSend size={25} />
              </button>
        </form>
    </div>
  )
}
