<script setup lang="ts">import { ref } from 'vue';

definePageMeta({
  layout: "admin",
});

const selectedType = ref('type-1');

// Храним состояние каждого инструмента
const isAidKitVisible = ref(false);
const isExitVisible = ref(false);
const isFireExtinguisherVisible = ref(false);
const isKubVisible = ref(false);

// Функции для добавления/удаления инструментов
const toggleAidKit = () => {
  isAidKitVisible.value = !isAidKitVisible.value;
};
const toggleExit = () => {
  isExitVisible.value = !isExitVisible.value;
};
const toggleFireExtinguisher = () => {
  isFireExtinguisherVisible.value = !isFireExtinguisherVisible.value;
};
const toggleKub = () => {
  isKubVisible.value = !isKubVisible.value;
};
</script>

<template>
  <div class="container">
    <StyleBlock>
      <div class="container__block">
        <select v-model="selectedType" class="container__select">
          <option value="type-1">Тип 1</option>
          <option value="type-2">Тип 2</option>
          <option value="type-3">Тип 3</option>
          <option value="type-4">Тип 4</option>
          <option value="type-5">Тип 5</option>
          <option value="type-6">Тип 6</option>
        </select>

        <!-- Кнопки для добавления/удаления инструментов -->
        <button @click="toggleAidKit" class="container__button">
          {{ isAidKitVisible ? 'Удалить аптечку' : 'Добавить аптечку' }}
        </button>
        <button @click="toggleExit" class="container__button">
          {{ isExitVisible ? 'Удалить выход' : 'Добавить выход' }}
        </button>
        <button @click="toggleFireExtinguisher" class="container__button">
          {{ isFireExtinguisherVisible ? 'Удалить огнетушитель' : 'Добавить огнетушитель' }}
        </button>
        <button @click="toggleKub" class="container__button">
          {{ isKubVisible ? 'Удалить оборудование' : 'Добавить оборудование' }}
        </button>
      </div>

      <button class="container__big-button">Сохранить</button>
    </StyleBlock>


    <div v-if="selectedType === 'type-1'">
      <svg width="1006" height="506" viewBox="0 0 1006 506" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 503V3H1003V503H3Z" fill="white" stroke="black" stroke-width="6"/>
      </svg>
    </div>
    <div v-if="selectedType === 'type-2'">
      <svg width="1006" height="846" viewBox="0 0 1006 846" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 843V3H1003V843H3Z" fill="white" stroke="black" stroke-width="6"/>
      </svg>
    </div>
    <div v-if="selectedType === 'type-3'">
      <svg width="1006" height="726" viewBox="0 0 1006 726" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M354.583 511.681V723H3V3H1003V511.681H354.583Z" fill="white" stroke="black" stroke-width="6"/>
      </svg>
    </div>
    <div v-if="selectedType === 'type-4'">
      <svg width="1006" height="726" viewBox="0 0 1006 726" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M354.583 511.681V723H3V3H1003V511.681H354.583Z" fill="white" stroke="black" stroke-width="6"/>
      </svg>
    </div>
    <div v-if="selectedType === 'type-5'">
      <svg width="1006" height="826" viewBox="0 0 1006 826" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M430.419 753.372V823H3V3H389.022V88.16H541.172V3H1003V823H635.796V753.372H430.419Z" fill="white" stroke="black" stroke-width="6"/>
      </svg>
    </div>
    <div v-if="selectedType === 'type-6'">
      <svg width="1006" height="506" viewBox="0 0 1006 506" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 503V3H1003V503H3Z" fill="white" stroke="black" stroke-width="6"/>
      </svg>
    </div>

    <div class="flex">
      <div v-if="isAidKitVisible">
        <img src="@/assets/aid-kit.png" alt="Aid Kit" />
      </div>
      <div v-if="isExitVisible">
        <img src="@/assets/exit.png" alt="Exit" />
      </div>
      <div v-if="isFireExtinguisherVisible">
        <img src="@/assets/fire-extinguisher.png" alt="Fire Extinguisher" />
      </div>
      <div v-if="isKubVisible">
        <img src="@/assets/kub.png" alt="Kub" />
      </div>
    </div>
    </div>

</template>

<style scoped lang="scss">
@use '@/assets/scss/_fonts' as *;

.flex {
  display: flex;
}

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
    transition: all 0.3s ease;
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

  img {
    max-width: 100%;
    height: auto;
    margin-top: 20px;
  }
}
</style>
