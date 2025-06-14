import {useEffect} from 'react'
import { useChatStore } from '../stores/useChatStore'

export default function ChatContainer() {
  const {getMessages, selectedUser, isMessageLoading} = useChatStore()
  useEffect(() => {
    getMessages(selectedUser._id)
  },[selectedUser._id, getMessages])

  if(isMessageLoading) return <div>Carregando...</div>
  return (
    <div className="flex flex-1 flex-col overflow-auto">ChatContainer</div>
  )
}
