import { create } from 'zustand'
import { api } from '../libs/axios'
import toaster from 'react-hot-toast'

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    set({ isCheckingAuth: true })
    try {
      const res = await api.get('/auth/check')
      set({ authUser: res.data })
    } catch (error) {
      console.log('Erro ao checar auth: ', error.message)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    } 
  },
  signup: async (data) => {
    set({ isSigningUp: true })
    try {
      const res = await api.post('/auth/signup', data)
      set({ authUser: res.data })
      toaster.success('Cadastro realizado com sucesso')
    } catch (error) {
      toaster.error(error?.response?.data ? error.response.data.message : error.message)
    } finally {
      set({ isSigningUp: false })
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true })
    try {
      const res = await api.post('/auth/login', data)
      set({ authUser: res.data })
      toaster.success('Login realizado com sucesso')
    } catch (error) {
      toaster.error(error?.response?.data ? error.response.data.message : error.message)
    } finally {
      set({ isLoggingIn: false })
    }
  },
  logout: async () => {
    try {
      await api.post('/auth/logout')
      set({ authUser: null })
      toaster.success('Logout realizado com sucesso')
    } catch (error) {
      console.log(error.message)
      toaster.error(error?.response?.data ? error.response.data.message : error.message)
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true })
    try {
      const res = await api.post('/users/update-profile', data, {
        headers: {'Content-Type': 'multipart/form-data'}
      })
      set({ authUser: res.data })
      toaster.success('Perfil atualizado com sucesso')
    } catch (error) {
      console.log(error.message)
      toaster.error(error?.response?.data ? error.response.data.message : error.message)
    } finally {
      set({ isUpdatingProfile: false })
    }
  }
}))