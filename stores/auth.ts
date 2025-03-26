import { defineStore } from 'pinia'
import type { User } from '~/types/user'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        // Имитация API запроса к users.json
        const response = await useFetch('/api/auth/login', {
          method: 'POST',
          body: { email, password },
        })

        if (!response.data.value) {
          throw new Error('Неверные учетные данные')
        }

        this.user = response.data.value as unknown as User
        this.isAuthenticated = true

        // Сохраняем сессию
        localStorage.setItem('user', JSON.stringify(this.user))

        return this.user
      } catch (error) {
        throw new Error('Неверный email или пароль')
      }
    },

    async logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('user')
      await navigateTo('/')
    },

    checkAuth() {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        this.user = JSON.parse(savedUser)
        this.isAuthenticated = true
      }
    },
  },

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
  },
})
