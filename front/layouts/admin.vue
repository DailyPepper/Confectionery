<script lang="ts" setup>
import MenuLink from "@/components/MenuLink.vue";

const isHiding = ref(false);

const hiding = () => {
  isHiding.value = !isHiding.value;
}
</script>

<template>
  <section :class="['section', { collapsed: isHiding }]">
    <div class="section__block">
      <div class="section__block--personal">
        <div v-if="!isHiding">
          <p class="section__block--name">
            Кирилл Андреевич
          </p>
          <p class="section__block--email">
            директор
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
      <div class="section__logout--exit">
        <SvgoLogout
          class="section__logout--icon"
          alt="Выйти"
        />
        <span
          v-if="!isHiding"
          class="section__logout-exit-text"
        >
          Выйти
        </span>
      </div>
    </div>
  </section>
  <slot />
</template>

<style scoped lang="scss">
@use '@/assets/scss/_fonts' as *;

.section {
  width: 334px;
  background-color: rgba(41, 3, 6, 1);
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
    position: absolute;
    right: 10px;
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
