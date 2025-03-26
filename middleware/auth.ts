export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Главная страница теперь является страницей логина
  const publicRoutes = ['/']

  // Если пользователь не авторизован и пытается попасть на защищенный роут
  if (!authStore.isLoggedIn && !publicRoutes.includes(to.path)) {
    return navigateTo('/')
  }

  // Если пользователь авторизован и пытается попасть на страницу логина
  if (authStore.isLoggedIn && publicRoutes.includes(to.path)) {
    return navigateTo('/account')
  }
})
