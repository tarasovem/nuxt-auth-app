<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'
import { useAuthStore } from '~/stores/auth'

// Схема валидации
const schema = z.object({
  email: z.string().min(1, 'Email обязателен для заполнения').email('Неверный формат email'),
  password: z
    .string()
    .min(1, 'Пароль обязателен для заполнения')
    .min(8, 'Пароль должен содержать минимум 8 символов'),
})

// Типизация на основе схемы
type FormData = z.infer<typeof schema>

// Состояние формы
const state = reactive<FormData>({
  email: '',
  password: '',
})

const isLoading = ref(false)
const authStore = useAuthStore()
const router = useRouter()
const form = ref()

async function onSubmit(event: FormSubmitEvent<FormData>) {
  try {
    isLoading.value = true
    await authStore.login(event.data.email, event.data.password)
    await router.push('/account')
  } catch (error) {
    form.value?.setErrors([
      {
        name: 'email',
        message: (error as Error).message,
      },
    ])
  } finally {
    isLoading.value = false
  }
}

// Проверяем авторизацию при загрузке
onMounted(() => {
  authStore.checkAuth()
})
</script>

<template>
  <div class="page-container">
    <UCard variant="outline" class="flex flex-col justify-center w-full max-w-md">
      <div class="text-xl font-semibold text-center mb-4">Вход в систему</div>

      <UForm
        ref="form"
        :state="state"
        :schema="schema"
        @submit="onSubmit"
        :validate-on="['input', 'blur']"
        :validate-on-input-delay="300"
        class="space-y-4"
      >
        <UFormField class="mb-5" label="Email" name="email">
          <UInput v-model="state.email" class="w-full" placeholder="Введите email" />
        </UFormField>

        <UFormField class="mb-7" label="Пароль" name="password">
          <UInput
            v-model="state.password"
            class="w-full"
            type="password"
            placeholder="Введите пароль"
          />
        </UFormField>

        <UButton
          type="submit"
          variant="solid"
          class="w-full justify-center"
          :loading="isLoading"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Вход...' : 'Войти' }}
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>

<style lang="scss">
.page-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-inline: 1rem;
}
</style>
