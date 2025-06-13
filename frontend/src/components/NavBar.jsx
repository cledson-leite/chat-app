import React from 'react'
import { Link } from 'react-router-dom'
import { LuMessageSquareDiff } from "react-icons/lu"
import { MdSettings, MdLogout } from "react-icons/md"
import { FaUserAlt } from "react-icons/fa"
import { useAuthStore } from '../stores/useAuthStore'

export default function NavBar() {
  const {logout, authUser} = useAuthStore()
  return (
    <header className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 h-[60px] '>
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center gap-8 border-none pl-5">
          <Link to="/" className="flex items-center gap-5 hover:opacity-80 transition-all">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <LuMessageSquareDiff className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold">Chat App</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4 pr-5">
        <Link to="/settings" className="btn btn-sm gap-2 bg-transparent border-none">
          <MdSettings className="w-4 h-4" />
          <span className="hidden sm:inline">Configuração</span>
        </Link>
        {authUser && (
          <>
            <Link to="/profile" className="btn btn-sm gap-2 ">
              <FaUserAlt className="size-5" />
              <span className="hidden sm:inline">Perfil</span>
            </Link>
            <button className="flex gap-2 items-center" onClick={logout}>
            <MdLogout className="size-5" />
            <span className="hidden sm:inline">Sair</span>
          </button>
          </>
        )}
        </div>
      </div>
    </header>
    // <div>navibar</div>
  )
}
