<template>
  <div class="order-estimation-page">
    <StyleBlock class="header">
        <div class="block">
            <select v-model="sortType" @change="sortOrders" class="sort-select">
                <option value="">Тип сортировки</option>
                <option value="name">По наименованию</option>
                <option value="price">По цене</option>
              </select>
              <button class="urgent-order-button">Срочный заказ</button>
        </div>

    </StyleBlock>

    <section class="cost-estimation">
      <h2>Оценка затрат – 006 Торт 'Рафаэль'</h2>
      <table class="order-table">
        <thead>
          <tr>
            <th>Артикул</th>
            <th>Наименование</th>
            <th>Тип</th>
            <th>Кол-во</th>
            <th>Кол-во на наливке</th>
            <th>На остатке</th>
            <th>Ед. измер.</th>
            <th>Цена</th>
            <th>Итого</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orderItems" :key="item.artikul">
            <td>{{ item.artikul }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.quantityOnFill }}</td>
            <td>{{ item.remaining }}</td>
            <td>{{ item.unit }}</td>
            <td>{{ item.price }} руб./{{ item.unit }}</td>
            <td>{{ item.total }}</td>
          </tr>
        </tbody>
      </table>

      <div class="summary">
        <p>Итоговая себестоимость заказа: {{ totalCost }} руб</p>
        <p>Недостающие ингредиенты: {{ missingItems }} позиции</p>
        <p>
          Минимальное время доставки: 2 дня (включает кокосовую стружку, яйца, сахар и
          сливки молочные)
        </p>
        <p>Рекомендации по закупкам:</p>
        <ul>
          <li>
            - Поставщик "Продукт Сервис": кокосовая стружка, яйца — доставка через 1 день.
          </li>
          <li>- Поставщик "Молоко и Ко": сливки молочные — доставка через 2 дня.</li>
        </ul>
      </div>
    </section>

    <section class="production-time">
      <h2>Оценка времени производства</h2>
      <div class="timeline">
        
      </div>
      <p>Минимальное время на приготовление заказа: 2 ч 1 ч. 25 мин.</p>
    </section>
</div>
</template>

<script setup>
import { ref } from "vue";

const sortType = ref("");
const orderItems = ref([
  {
    artikul: "478484737",
    name: "Кокосовая стружка",
    type: "Ингредиент",
    quantity: 30,
    quantityOnFill: 20,
    remaining: 10,
    unit: "г",
    price: 10,
    total: 100,
  },
  {
    artikul: "993847573",
    name: 'Торт "Рафаэль"',
    type: "Украшение",
    quantity: 3,
    quantityOnFill: 5,
    remaining: 1,
    unit: "шт",
    price: 15,
    total: 45,
  },
]);

const productionTasks = ref([
  { name: "Миксер №1", duration: 30, color: "#f4b183" },
  { name: "Основной цех (подготовка)", duration: 40, color: "#ffd966" },
  { name: "Крем (взбивание)", duration: 20, color: "#93c47d" },
]);

const totalCost = ref(386);
const missingItems = ref(4);

const sortOrders = () => {
};
definePageMeta({
  layout: "admin",
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/_fonts' as *;
.order-estimation-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @include Comic(16px, 400);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .sort-select {
      width: 200px;
      padding: 10px;
      border-radius: 5px;
    }

    .urgent-order-button {
      background-color: #ff8b16;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
    }
  }

  .cost-estimation {
    width: 80%;
    max-width: 55%;
    padding-top: 40px;
    h2 {
      @include Comic(36px, 700);
      margin-bottom: 20px;
    }

    .order-table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 10px;
        border: 1px solid #fee0cb;
      }

      th {
        background-color: #fee0cb;
        font-weight: bold;
      }
    }

    .summary {
      margin-top: 20px;
      font-size: 16px;

      ul {
        padding-left: 20px;
      }
    }
  }

  .production-time {
    .timeline {
      display: flex;
      gap: 10px;
      margin-top: 20px;

      .task {
        display: flex;
        align-items: center;

        .task-bar {
          height: 30px;
          border-radius: 5px;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 5px;
          font-size: 14px;
        }
      }
    }
  }
}
.block {
    display: flex;
    justify-content: space-between;
}
</style>
