<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const authStore = useAuthStore()
</script>

<template>
  <div>Аккаунт</div>
  <UButton @click="() => authStore.logout()">Выйти</UButton>
</template>
