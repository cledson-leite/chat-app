import React from 'react'
import { LuMessageSquareDiff } from "react-icons/lu"

export default function NoChatSelected() {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16a h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
              <LuMessageSquareDiff className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Bem vindo ao Chat App</h2>
        <p className="text-base-content/60">Selecione um contato para comecar a conversar</p>
      </div>
    </div>
  )
}
