<script lang="ts" setup>
import MenuLink from "@/components/MenuLink.vue";
import { useUserStore } from '~/store/user';

const isHiding = ref(false);
const userStore = useUserStore();

async function redirectLogin() {
  try {
    await userStore.logout();
    navigateTo('/login')
  } catch (error) {
    console.error('Ошибка при выходе:', error);
  }
}

const hiding = () => {
  isHiding.value = !isHiding.value;
}

defineExpose({
  redirectLogin
});
</script>

<template>
  <section :class="['section', { collapsed: isHiding }]">
    <div class="section__block">
      <div class="section__block--personal">
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
        <SvgoOpenSlider
          v-if="isHiding"
          @click="hiding"
          alt="Скрыть"
          class="section__block--iconClose"
        />
        <SvgoCloseSlider
          v-else
          @click="hiding"
          class="section__block--icon"
          alt="Показать"
        />
      </div>
      <MenuLink :isHiding="isHiding" />
    </div>
    <div class="section__logout">
      <div
        class="section__logout--exit"
        @click="redirectLogin"
      >
        <SvgoLogout
          class="section__logout--icon"
          alt="Выйти"
        />
        <span
          v-if="!isHiding"
          class="section__logout-exit-text"
        >
          Logout
        </span>
      </div>
      <img
        v-if="!isHiding"
        src="../assets/icons/logo.svg"
        alt="logo"
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
  transition: width 0.5s ease;

  &.collapsed {
    width: 80px;
  }

  &__block {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 80px;
    gap: 40px;
  }

  &__block--name {
    @include verdana-font(20px, 700);
    color: #fdfeff;
  }

  &_block-email {
    @include verdana-font(14px, 400);
    color: #fdfeff;
  }

  &__block--personal {
    display: flex;
    align-items: center;
  }

  &__block--icon {
    position: relative;
    left: 50px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  &__block--iconClose {
    width: 20px;
    height: 20px;
    cursor: pointer;

    &-manage {
      @include verdana-font(20px, 400);
    }
  }

  &__block--name {
    color: #fdfeff;
    font-size: 20px;
    word-spacing: 10px;
    justify-content: center;
    display: flex;
  }

  &__block--email {
    @include verdana-font(20px, 400);

    color: #fdfeff;
    font-size: 13px;
    display: flex;
    justify-content: center;
  }

  &__logout {
    @include verdana-font(20px, 400);

    padding-bottom: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    .nuxt-icon.section_logout-icon {
      width: 24px;
      height: 24px;
    }
  }

  &__logout--exit {
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
  }

  &__logout--icon {
    width: 20px;
    height: 20px;
  }

  &__logout-exit-text {
    color: #fdfeff;
    font-size: 20px;
  }
}
</style>
