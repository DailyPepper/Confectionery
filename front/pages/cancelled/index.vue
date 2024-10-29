<template>
  <div class="container">
    <p class="container__heading">Списание ингредиентов и украшений</p>
    <table class="container__styled-table">
      <thead>
        <tr>
          <th>Артикул</th>
          <th>Наименование</th>
          <th>Кол-во</th>
        </tr>
      </thead>
      <tbody>
        <!-- Loop through each item in the ingredients array -->
        <tr v-for="(item, index) in ingredients" :key="index">
          <td>{{ item.artikul }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({
    layout: 'admin',
});

const ingredients = ref([
  { artikul: '45924', name: 'Яйцо второй категории (45-55 гр.)', quantity: 2 },
  { artikul: '435695', name: 'Паста-пюре фрукт.КОНФРУТТИ НАТУР садов.ягоды', quantity: 3 },
  { artikul: '00544', name: 'Свеча-цифра 23046-0', quantity: 5 }
]);
</script>

<style scoped lang="scss">
@use '@/assets/scss/_fonts' as *;

.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__heading {
    text-align: left;
    width: 1200px;
    @include Comic(36px, 700, 120%);
    margin-top: 60px;
    margin-bottom: 30px;
  }

  &__styled-table {
    width: 100%;
    max-width: 1200px;
    border-collapse: collapse;
    text-align: left;
    border: 1px solid #FEEEDB;
    @include Comic(16px, 400);

    th, td {
      padding: 15px;
    }

    tr {
      border-bottom: 1px solid #FEEEDB; 
    }

    th {
      background-color: #FEEEDB;
      font-weight: bold;
    }
  }
}
</style>
