<template>
  <section class="container">
    <StyleBlock>
      <div class="block">
        <select v-model="selectedType" class="block__select" @change="filterItems">
          <option value="">Выберите тип</option>
          <option value="Кокосовая стружка">Кокосовая стружка</option>
          <option value="Яйца">Яйца</option>
          <option value="Выпеченные полуфабрикаты">Выпеченные полуфабрикаты</option>
          <option value="Шарики желейные">Шарики желейные</option>
          <option value="Сахар">Сахар</option>
        </select>
  
        <select
          v-model="selectedIngredientType"
          class="block__select"
          @change="filterItems"
        >
          <option value="">Тип ингредиента / украшения</option>
          <option value="Кокосовая стружка">Кокосовая стружка</option>
          <option value="Яйца">Яйца</option>
          <option value="Выпеченные полуфабрикаты">Выпеченные полуфабрикаты</option>
          <option value="Шарики желейные">Шарики желейные</option>
          <option value="Сахар">Сахар</option>
        </select>
      </div>
    </StyleBlock>
  
    <section
      class="result-section"
      v-for="(tableData, index) in filteredData"
      :key="index"
    >
      <h2>До {{ tableData.days }} дней</h2>
  
      <template v-if="tableData.items.length > 0">
        <table>
          <thead>
            <tr>
              <th>Артикул</th>
              <th>Наименование</th>
              <th>Тип ингредиента / украшения</th>
              <th>Кол-во</th>
              <th>Ед. измерения</th>
              <th>Срок годности</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableData.items" :key="item.id">
              <td>{{ item.artikul }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.ingredientType }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.unit }}</td>
              <td>{{ item.expirationDate }}</td>
            </tr>
          </tbody>
        </table>
        <p class="total">Итого: {{ tableData.items.length }} единиц</p>
      </template>
  
      <!-- Message if there are no items for the selected days -->
      <p v-else class="no-data-message">Нет данных на эти дни</p>
    </section>
  </section>
  
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const selectedType = ref("");
const selectedIngredientType = ref("");

const data = ref([
  {
    days: 3,
    items: [
      {
        artikul: "5342523",
        name: 'Кокосовая стружка "Медиум"',
        ingredientType: "Кокосовая стружка",
        quantity: 20,
        unit: "г",
        expirationDate: "02.11.2024",
      },
      {
        artikul: "3565454",
        name: "Яйцо первой категории (55-65 гр.)",
        ingredientType: "Яйца",
        quantity: 50,
        unit: "шт",
        expirationDate: "03.11.2024",
      },
    ],
  },
  {
    days: 6,
    items: [
      {
        artikul: "5342523",
        name: "Протироль 37 мм.",
        ingredientType: "Выпеченные полуфабрикаты",
        quantity: 5,
        unit: "шт",
        expirationDate: "05.11.2024",
      },
      {
        artikul: "3565454",
        name: "Шарики желейные.ЧЕРЕШНЯ 13/14 мм",
        ingredientType: "Шарики желейные",
        quantity: 10,
        unit: "шт",
        expirationDate: "06.11.2024",
      },
    ],
  },
  {
    days: 9,
    items: [
      {
        artikul: "5342523",
        name: "Сахар-песок весовой (1 кг х 1)",
        ingredientType: "Сахар",
        quantity: 200,
        unit: "г",
        expirationDate: "09.11.2024",
      },
    ],
  },
]);

const filterItems = () => {
  filteredData.value = data.value.map((table) => {
    const filteredItems = table.items.filter((item) => {
      const matchesType = !selectedType.value || item.name.includes(selectedType.value);
      const matchesIngredientType =
        !selectedIngredientType.value ||
        item.ingredientType === selectedIngredientType.value;
      return matchesType && matchesIngredientType;
    });
    return { ...table, items: filteredItems };
  });
};

const filteredData = computed(() =>
  data.value.map((table) => ({
    ...table,
    items: table.items.filter((item) => {
      const matchesType = !selectedType.value || item.name.includes(selectedType.value);
      const matchesIngredientType =
        !selectedIngredientType.value ||
        item.ingredientType === selectedIngredientType.value;
      return matchesType && matchesIngredientType;
    }),
  }))
);

definePageMeta({
  layout: "admin",
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/_fonts' as *;

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.section {
  margin: 70px 0px;

  &__text {
    @include Comic(20px, 400);
    margin-top: 25px;
    color: rgba(5, 17, 37, 1);
  }
}
.result-section {
  width: 80%;
  max-width: 55%;
  padding-top: 40px;
  h2 {
    @include Comic(36px, 700);
    margin-bottom: 20px;
  }
}

.result-btn {
  width: 280px;
  height: 64px;
  background-color: rgb(255, 139, 22);
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.result-btn:hover {
  background-color: rgba(254, 216, 127, 1);
  color: rgba(0, 0, 0, 1);
  transition: 0.7s;
}

input[type="checkbox"] {
  cursor: pointer;
}

.checkbox-rect {
  display: inline-block;
  position: relative;
}

.checkbox-rect input[type="checkbox"] {
  display: none;
}

.checkbox-rect input[type="checkbox"] + label {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 0;
  cursor: pointer;
  height: 14px;
  padding: 6px;
}

.checkbox-rect input[type="checkbox"]:hover + label:hover {
  color: rgb(23, 86, 228);
}

.checkbox-rect input[type="checkbox"]:hover + label:before {
  background: #196aa6;
  box-shadow: inset 0px 0px 0px 2px #f7f2f2;
}

.checkbox-rect input[type="checkbox"] + label:before {
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  border: 1px solid #343a3f;
  border-radius: 0.2em;
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.2s, background 0.2s ease-in-out;
  background: #f3f3f3;
}

.checkbox-rect input[type="checkbox"]:checked + label:before {
  width: 14px;
  height: 14px;
  border-radius: 0.2em;
  border: 1px solid #fff;
  transform: rotate(90deg);
  background: #196aa6;
  box-shadow: 0 0 0 1px #000;
}
.total {
  @include Comic(20px, 400);
  margin-top: 20px;
}
.block {
  display: flex;
  gap: 20px;
}
.block__select {
  width: 340px;
  height: 50px;
  border-radius: 20px;
  padding: 15px;
  font-size: 16px;
  outline: none;
  appearance: none;
  background-image: url("../../assets/icons/cursor.svg");
  background-repeat: no-repeat;
  background-position: right 15px center;
  width: 360px;
  height: 64px;
  padding: 20px;
  border-radius: 20px;
}
.block__button {
  background-color: #ff8b16;
  color: #ffffff;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
.block__edit {
  background-color: rgba(254, 216, 127, 1);
  color: #000;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
.block__button:hover {
  background-color: rgba(254, 216, 127, 1);
  color: rgba(0, 0, 0, 1);
  transition: 0.7s;
}
.block__edit:hover {
  background-color: #ff8b16;
  color: #ffffff;
  transition: 0.7s;
}
table {
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

.no-data-message {
  font-size: 18px;
  color: #888;
  margin-top: 20px;
  text-align: center;
}
  
</style>
