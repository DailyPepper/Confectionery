<template>
  <div class="login-page">
    <main class="login-page__main-content">
      <div class="login-page__form-container">
        <img src="/assets/logo.png" alt="Logo" class="login-page__logo" />
        <form class="login-page__form" @submit.prevent="handleSubmit">
          <div class="login-page__form-errors">
            <p v-if="formError" class="login-page__error">{{ formError }}</p>
          </div>
          <InputWithLabel v-model="name" type="text" placeholder="ФИО"
            class="login-page__input login-page__input--name" />
          <InputWithLabel v-model="username" type="text" placeholder="Логин" class="login-page__input" />
          <InputWithLabel v-model="password" type="password" placeholder="Пароль" class="login-page__input" />
          <p v-if="passwordError" class="login-page__error">{{ passwordError }}</p>
          <button type="submit" class="login-page__button login-page__button--login">
            Зарегистрироваться
          </button>
          <button class="login-page__button login-page__button--registration" @click="navigateToLogin">
            Назад
          </button>
        </form>
      </div>
    </main>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/store/userAuth';

const registrationStore = useAuthStore();

const name = ref('');
const username = ref('');
const password = ref('');
const formError = ref('');
const passwordError = ref('');

const router = useRouter();

async function handleSubmit() {
  if (!validatePassword()) {
    return;
  }

  if (name.value && username.value && password.value) {
    try {
      await registrationStore.fetchRegistration({
        username: username.value,
        fullName: name.value,
        password: password.value
      })

      navigateTo('login')
    } catch (error) {
      console.log('Ошибка регистрации');
    }
  }

  formError.value = '';
  passwordError.value = '';
}

function validatePassword() {
  if (password.value.length < 5 || password.value.length > 20) {
    passwordError.value = 'Пароль должен содержать от 5 до 20 символов';
    return false;
  }

  if (password.value.toLowerCase().includes(username.value.toLowerCase())) {
    passwordError.value = 'Пароль должен содержать логин';
    return false;
  }

  const hasUppercase = /[A-Z]/.test(password.value);
  const hasLowercase = /[a-z]/.test(password.value);

  if (!hasUppercase || !hasLowercase) {
    passwordError.value = 'Пароль должен содержать заглавные и маленькие буквы';
    return false;
  }

  return true;
}

function navigateToLogin() {
  router.push('/login');
}
</script>


<style scoped lang="scss">
@use '@/assets/scss/_fonts' as *;

.login-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__input--name {
    margin-top: 60px;
  }

  &__main-content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__form-container {
    margin-top: 30px;
    width: 100%;
    max-width: 840px;
    text-align: center;
  }

  &__logo {
    width: 150px;
    height: 150px;
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__form-errors {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 36px;
  }

  &__error {
    @include Comic(20px, 400);
    color: red;
    margin-top: 8px;
    text-align: left;
  }

  &__button {
    @include Comic(24px, 400);
    margin-top: 16px;
    padding: 30px 0;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &--login {
      background-color: #FF8B16;
      color: white;
      border: none;
      margin-top: 60px;
    }

    &--registration {
      background-color: transparent;
      color: #FF8B16;
      border: 2px solid #FF8B16;
    }
  }
}
</style>
