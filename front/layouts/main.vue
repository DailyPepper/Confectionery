<script lang="ts" setup>
import { useUserStore } from '~/store/user';

const userStore = useUserStore();

async function redirectLogin() {
  try {
    await userStore.logout();
    navigateTo('/login')
  } catch (error) {
    console.error('Ошибка при выходе:', error);
  }
}

const isHiding = ref(false);

function toggleSidebar() {
  isHiding.value = !isHiding.value;
}

defineExpose({
  redirectLogin,
  toggleSidebar,
});
</script>

<template>
  <section :class="['section', { collapsed: isHiding }]">
    <div class="section_block">
      <div v-if="!isHiding">
        <p 
          v-if="userStore.user"
          class="section__block--name" 
        >
          {{ userStore.user.firstName }} {{ userStore.user.lastName }}
        </p>
        <p 
          v-if="userStore.user"
          class="section__block--email" 
        >
          {{ userStore.user.email }}
        </p>
      </div>
      <button
        @click="toggleSidebar"
        class="toggle-button"
      >
        <SvgoOpenSlider
          v-if="isHiding"
          class="toggle-icon"
        />
        <SvgoCloseSlider
          v-else
          class="toggle-icon"
        />
      </button>
    </div>

    <div class="section_logout">
      <div
        class="section_logout-exit"
        @click="redirectLogin"
      >
        <SvgoLogout
          class="section_logout-icon"
          alt="Выйти"
        />
        <span
          v-if="!isHiding"
          class="section_logout-exit-text"
        >Logout</span>
      </div>
      <img
        src="../assets/icons/logo.svg"
        alt="logo"
        v-if="!isHiding"
      />
    </div>
  </section>
  <slot />
</template>

<style scoped lang="scss">
@use '@/assets/scss/_fonts' as *;

.section {
  width: 334px;
  background-color: #051125;
  position: fixed;
  top: 0;
  height: 100vh;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.3s ease;

  &_logout-icon {
    width: 24px;
    height: 24px;
  }

  &.collapsed {
    width: 80px;

    .section_user-text,
    .section_block-name,
    .section_block-email,
    .section_logout-exit-text {
      display: none;
    }

    img {
      display: none;
    }

    .section_user {
      justify-content: center;
      width: 100%;
      padding: 0;
    }
  }

  &_block {
    display: flex;
    align-items: center;
    padding-top: 80px;
    gap: 40px;
  }

  &__block--name {
    @include verdana-font(20px, 700);
    
    color: #fdfeff;
  }
  
  &__block--email {
    @include verdana-font(14px, 400);

    color: #fdfeff;
  }

  &_user {
    display: flex;
    gap: 15px;
    margin-top: 30px;
    background-color: #f7f8fa;
    width: 284px;
    height: 64px;
    align-items: center;
    padding: 0 30px;
    position: relative;
    left: 25px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    transition: justify-content 0.3s ease, padding 0.3s ease;

    .section_user-icon {
      width: 32px;
      height: 32px;
    }
  }

  &_user-text {
    color: #051125;
  }

  &_logout {
    @include verdana-font(20px, 400);

    padding-bottom: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  &_logout-exit {
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
  }

  &_logout-exit-text {
    color: #fdfeff;
  }
}

.toggle-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}

.toggle-icon {
  width: 24px;
  height: 24px;
  cursor: pointer;
  fill: white;
}
</style>
