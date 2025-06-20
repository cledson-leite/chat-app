import {useEffect} from 'react'
import { useChatStore } from '../stores/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeletons/MessageSkeleton'
import { useAuthStore } from '../stores/useAuthStore'
import { formatDate } from '../../utils/format-date'

export default function ChatContainer() {
  const {getMessages, selectedUser, isMessageLoading, messages} = useChatStore()
  const {authUser} = useAuthStore()
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {
          messages.map(message => (
            <div 
            key={message._id}
              className={`chat ${message.senderId === authUser.id ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img 
                      src={message.senderId === authUser.id ? authUser.profilePic : selectedUser.profilePic} 
                      alt={message.senderId === authUser.id ? authUser.firstName : selectedUser.firstName} 
                      className="w-full h-full" 
                    />
                  </div>
                </div>
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50">{formatDate(message.createdAt)}</time>
                </div>
                <div className={`chat-bubble flex flex-col ${message.senderId === authUser.id ? 'bg-primary' : 'bg-green-500'}`}>
                  {message.image && (
                    <a href={message.image} target="_blank" rel="noreferrer nopener">
                      <img 
                      src={message.image}
                      alt="Attachment" 
                      className="rounded-md mb-2 object-fill w-30" />
                    </a>
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
            </div>
          ))
        }
      </div>
      <MessageInput />
    </div>
  )
}
