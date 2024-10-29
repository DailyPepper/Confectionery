<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({
  layout: "admin",
});

const selectedType = ref('type-1'); // Track selected type
</script>

<template>
  <div class="container">
    <StyleBlock>
      <div class="container__block">
        <!-- Type Selection Dropdown -->
        <select v-model="selectedType" class="container__select">
          <option value="type-1">Тип 1</option>
          <option value="type-2">Тип 2</option>
          <option value="type-3">Тип 3</option>
          <option value="type-4">Тип 4</option>
          <option value="type-5">Тип 5</option>
        </select>
        <button class="container__button">Добавить аптечку</button>
        <button class="container__button">Добавить выход</button>
        <button class="container__button">Добавить огнетушитель</button>
        <button class="container__button">Добавить оборудование</button>
      </div>
      <button class="container__big-button">Сохранить</button>
    </StyleBlock>

    <!-- Conditional Divs based on Selected Type -->
    <div v-if="selectedType === 'type-1'">Тип 1</div>
    <div v-if="selectedType === 'type-2'">Тип 2</div>
    <div v-if="selectedType === 'type-3'">Тип 3</div>
    <div v-if="selectedType === 'type-4'">Тип 4</div>
    <div v-if="selectedType === 'type-5'">Тип 5</div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/_fonts' as *;

.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__block {
    display: flex;
    gap: 20px;
  }

  &__select {
    width: 210px;
    height: 64px;
    padding: 20px;
    border-radius: 20px;
    @include Comic(16px, 400, 120%);
  }

  &__button {
    border-radius: 10px;
    width: 210px;
    height: 64px;
    cursor: pointer;
    background-color: #fed87f;
    color: #000000;
    border: none;
    @include Comic(16px, 400, 120%);
  }

  &__big-button {
    height: 64px;
    width: 100%;
    margin-top: 20px;
    background-color: #ff8b16;
    border: 0;
    border-radius: 20px;
    @include Comic(16px, 400, 120%);
  }
}
</style>
