import {create} from 'zustand'
import toaster from 'react-hot-toast'
import {api} from '../libs/axios'

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true })
    try {
      const res = await api.get('/users')
      set({ users: res.data })
    } catch (error) {
      console.log(error.message)
      toaster.error(error?.response?.data ? error.response.data.message : error.message)
    } finally {
      set({ isUserLoading: false })
    }
  },
  getMessages: async (userId) => {
    set({ isMessageLoading: true })
    try {
      const res = await api.get('/messages/' + userId)
      set({ messages: res.data })
    } catch (error) {
      console.log(error.message)
      toaster.error(error?.response?.data ? error.response.data.message : error.message)
    } finally {
      set({ isMessageLoading: false })
    }
  },
  sendMessage: async (data) => {
    const {selectedUser, messages} = get()
    try {
      const res = await api.post(`/messages/send/${selectedUser._id}`, data)
      set({ messages: [...messages, res.data] })
    } catch (error) {
      console.log(error.message)
      toaster.error(error?.response?.data ? error.response.data.message : error.message)
    }
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user })
  }
}))