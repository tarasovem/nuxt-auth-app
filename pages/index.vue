<script setup lang="ts"></script>

<template>
  <div class="page-container">
    <UCard variant="outline" class="flex flex-col justify-center w-full max-w-md">
      <div class="text-xl font-semibold text-center mb-4">Вход в систему</div>
      <UForm class="space-y-4">
        <UFormField class="mb-5" label="Email" name="email">
          <UInput class="w-full" placeholder="Введите email" />
        </UFormField>

        <UFormField class="mb-7" label="Пароль" name="password">
          <UInput class="w-full" type="password" placeholder="Введите пароль" />
        </UFormField>

        <UButton class="w-full justify-center" type="submit" variant="solid">Вход</UButton>
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
}
</style>
