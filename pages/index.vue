<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

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

async function onSubmit(event: FormSubmitEvent<FormData>) {
  try {
    isLoading.value = true
    console.log('Form data:', event.data)
  } catch (error) {
    console.error('Ошибка при отправке формы:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="page-container">
    <UCard variant="outline" class="flex flex-col justify-center w-full max-w-md">
      <div class="text-xl font-semibold text-center mb-4">Вход в систему</div>

      <UForm
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
