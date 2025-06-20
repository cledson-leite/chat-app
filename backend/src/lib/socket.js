import {Server} from 'socket.io'
import http from 'http'
import express from 'express'

export const app = express()
export const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    // origin: 'http://localhost:5173',
    // credentials: true
    origin: '*',
    credentials: true
  }
})
const userOnlineSocket = {}
export const getReceiverSocketId = (userId) => userOnlineSocket[userId].socketId
io.on('connection', (socket) => {
  console.log('Usuário conectado ', socket.id)
  const userId = socket.handshake.query.userId
  if(!userId) return
  userOnlineSocket[userId] ={ socketId: socket.id}
  io.emit('getOnlineUsers', Object.keys(userOnlineSocket))

  socket.on('disconnect', () => {
    console.log('Usuário desconectado ', socket.id)
    delete userOnlineSocket[userId]
    io.emit('getOnlineUsers', Object.keys(userOnlineSocket))
  })
})