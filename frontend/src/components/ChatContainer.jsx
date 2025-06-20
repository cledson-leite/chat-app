import {useEffect} from 'react'
import { useChatStore } from '../stores/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'

export default function ChatContainer() {
  const {getMessages, selectedUser, isMessageLoading} = useChatStore()
  useEffect(() => {
    getMessages(selectedUser._id)
  },[selectedUser._id, getMessages])

  if(isMessageLoading) return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  )
  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />
      <p>Messages ....</p>
      <MessageInput />
    </div>
  )
}
