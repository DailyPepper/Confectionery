<template>
  <div class="login-page">
    <main class="login-page__main-content">
      <div class="login-page__form-container">
        <img src="/assets/logo.png" alt="Logo" class="login-page__logo" />
        <form class="login-page__form" @submit.prevent="handleSubmit">
          <div class="login-page__form-errors">
            <p v-if="errorMessage" class="login-page__error">{{ errorMessage }}</p>
          </div>
          <InputWithLabel v-model="username" type="text" placeholder="Логин" class="login-page__input"
            :class="{ 'login-page__input--error': errorMessage }" :disabled="isBlocked" />
          <InputWithLabel v-model="password" type="password" placeholder="Пароль" class="login-page__input"
            :class="{ 'login-page__input--error': errorMessage }" :disabled="isBlocked" />
          <button type="submit" class="login-page__button login-page__button--login" :disabled="isBlocked">
            Вход
          </button>
          <button class="login-page__button login-page__button--registration" @click="navigateToRegistration">
            Регистрация
          </button>
        </form>
        <div v-if="showModal" class="modal">
          <div class="modal__content">
            <div>
              <p class="modal__text">
                Вы ввели неверные данные более трёх раз.
              </p>
              <p class="modal__text">
                Пожалуйста, подождите истечения таймера, прежде чем попробовать снова.
              </p>
              <p class="modal__timer">{{ formattedTime }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/store/userAuth';

const userStore = useAuthStore();

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const attemptCount = ref(0);
const isBlocked = ref(false);
const showModal = ref(false);
const remainingTime = ref(5);
let timer: number | undefined;

const router = useRouter();

const formattedTime = computed(() => {
  const minutes = Math.floor(remainingTime.value / 60);
  const seconds = remainingTime.value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

async function handleSubmit() {
  if (isBlocked.value) return;

  if (username.value && password.value) {
    try {
      await userStore.fetchLogin({
        username: username.value,
        password: password.value
      })

      if (userStore.isAuth) {
        navigateTo('/admin')
      }
    } catch (error) {
      console.log('Ошибка входа');

      attemptCount.value += 1;
      errorMessage.value = 'Неправильный логин или пароль';

      if (attemptCount.value >= 3) {
        blockUser();
      }
    }
  }
  resetLoginState();
}

function blockUser() {
  isBlocked.value = true;
  showModal.value = true;
  startTimer();
}

function startTimer() {
  timer = window.setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value -= 1;
    } else {
      resetLoginState();
    }
  }, 1000);
}

function resetLoginState() {
  isBlocked.value = false;
  showModal.value = false;
  remainingTime.value = 5;
  attemptCount.value = 0;
  errorMessage.value = '';

  if (timer !== undefined) {
    window.clearInterval(timer);
  }
}

function navigateToRegistration() {
  router.push('/registration');
}

watch(isBlocked, (newVal) => {
  if (!newVal && timer !== undefined) {
    window.clearInterval(timer);
  }
});
</script>




<style scoped lang="scss">
@use '@/assets/scss/_fonts' as *;

.login-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

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
    width: 396px;
    height: 396px;
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

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #290306CC;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal__content {
    position: relative;
    padding: 100px 160px;
    border-radius: 20px;
    text-align: center;
    background-color: #290306;
    color: #FFFFFF;
    width: 808px;
  }

  .modal__text {
    @include Comic(20px, 400);

    margin-top: 10px;
    font-weight: 400;

    & a {
      color: #FFFFFF;
      text-decoration: underline;
    }
  }

  .modal__timer {
    @include Comic(120px, 700);

    margin-top: 30px;
  }

  .modal__close {
    @include Comic(30px, 400);

    position: absolute;
    top: 20px;
    right: 25px;
    background: transparent;
    border: none;
    color: #FFFFFF;
    cursor: pointer;
  }
}
</style>
