import {useEffect} from 'react'
import { FaUserAlt } from "react-icons/fa"
import { useChatStore } from '../stores/useChatStore'
import SideBarSkeleton from './skeletons/SideBarSkeleton'

export default function SideBar() {
  const {getUsers, isUserLoading, users, setSelectedUser, selectedUser} = useChatStore()
  const onlineUsers = []

  useEffect(() => {
    getUsers()
  }, [getUsers])
  if(isUserLoading || !users.data) return <SideBarSkeleton />
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <FaUserAlt className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contatos</span>
        </div>
      </div>
        <div className="overflow-y-auto w-full py-3">
        {
          users.data.map(user => (
            <button 
              key={user._id}
              className={`
                w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors 
                ${selectedUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300': ''}
              `}
              onClick={() => setSelectedUser(user)}
            >
              <div className="relative  lg:max-0">
                <img 
                  src={user.profilePic}
                  alt={user.name}
                  className="size-12 object-cover rounded-full" 
                />
                {
                  onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                  )
                }
              </div>
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate" >{user.fullName}</div> 
                  <div className="text-sm text-zinc-400">
                    {onlineUsers.includes(user.id) ? 'Online' : 'Offline'}
                  </div>
              </div>
            </button>
          ))
        }
      </div>
    </aside>
  )
}
