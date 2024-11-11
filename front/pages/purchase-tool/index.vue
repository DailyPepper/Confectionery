<template>
  <section class="container">
    <div class="header-buttons">
      <button @click="addInstrument" class="add-button">Добавить инструмент</button>
      <button @click="printReport" class="print-button">Печать отчета</button>
    </div>

    <section
    class="result-section"
    >

        <table class="instrument-table">
            <thead>
              <tr>
                <th>Наименование</th>
                <th>Тип инструмента</th>
                <th>Поставщик</th>
                <th>Количество</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(instrument, index) in instruments" :key="index">
                <td>{{ instrument.name }}</td>
                <td>{{ instrument.type }}</td>
                <td>{{ instrument.supplier }}</td>
                <td>{{ instrument.quantity }}</td>
              </tr>
            </tbody>
          </table>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const instruments = ref([
  { name: "Кастрюля", type: "Посуда", supplier: "Какой-то поставщик", quantity: 12 },
  {
    name: "Форма для кексов",
    type: "Формы для выпечки",
    supplier: "Какой-то поставщик",
    quantity: 10,
  },
  {
    name: "Венчик",
    type: "Прочие аксессуары",
    supplier: "Какой-то поставщик",
    quantity: 8,
  },
  { name: "Сковорода", type: "Посуда", supplier: "Какой-то поставщик", quantity: 6 },
  {
    name: "Миксер ручной",
    type: "Миксеры и техника",
    supplier: "Какой-то поставщик",
    quantity: 4,
  },
  {
    name: "Нож для хлеба",
    type: "Кухонные ножи",
    supplier: "Какой-то поставщик",
    quantity: 3,
  },
]);

const addInstrument = () => {
  console.log("Adding new instrument");
};

const printReport = () => {
  console.log("Printing report");
};

definePageMeta({
  layout: "admin",
});
</script>
<style scoped lang="scss">

@use '@/assets/scss/_fonts' as *;

.result-section {
    width: 80%;
    max-width: 55%;
    padding-top: 40px;
    h2 {
      @include Comic(36px, 700);
      margin-bottom: 20px;
    }
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  @include Comic(16px, 400);

  .header-buttons {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    width: 80%;
    max-width: 55%;
    margin-top: 40px;



    .add-button,
    .print-button {
      background-color: #ff8b16;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s, color 0.3s;
      border-radius: 10px;
      width: 360px;
      height: 64px;
      cursor: pointer;


      &:hover {
        background-color: rgb(249, 209, 115);
        color: #000;
      }
    }
    .print-button {
        color: #000;
        background-color: #fed87f;
        &:hover {
            background-color: #f9e8c2;
            color: #000;
        } 
    }
  }

  .instrument-table {
    width: 80%;
    max-width: 1000px;
    border-collapse: collapse;
    text-align: left;
    margin-top: 20px;

    th,
    td {
      padding: 15px;
      border-bottom: 1px solid #feeedb;
    }

    th {
      background-color: #feeedb;
      font-weight: bold;
    }
  }
}
</style>
