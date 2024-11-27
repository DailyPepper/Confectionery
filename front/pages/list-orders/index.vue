<template>
  <div class="container">
    <StyleBlock>
      <div class="container__block">
        <select v-model="selectedStatus" class="container__select">
          <option value="">Все Статусы</option>
          <option value="Новый">Новый</option>
          <option value="Составление сметы">Составление сметы</option>
          <option value="Подтверждение">Подтверждение</option>
          <option value="Закупка">Закупка</option>
          <option value="Производство">Производство</option>
          <option value="Контроль">Контроль</option>
          <option value="Готов">Готов</option>
          <option value="Выполнен">Выполнен</option>
          <option value="Отменен">Отменен</option>
        </select>

        <button v-if="isCustomer || isClientManager" class="container__button container__button--add">Добавить</button>
        <button v-if="isCustomer" class="container__button">Удалить</button>
        <button v-if="isCustomer" class="container__button">Отменить</button>
        <button v-if="isClientManager" class="container__button container__button--manager" @click="openModal">
          Редактировать
        </button>
        <button v-if="isClientManager" class="container__button container__button--manager">Принять заказ</button>
      </div>
    </StyleBlock>

    <p class="container__heading">Результат</p>

    <table class="container__styled-table">
      <thead>
        <tr>
          <th></th>
          <th>Номер</th>
          <th>Дата</th>
          <th>Наименование</th>
          <th>Статус</th>
          <th>Цена</th>
          <th>Заказчик</th>
          <th>Дата конец</th>
          <th>Ответственный менеджер</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(order, index) in filteredOrders"
          :key="index"
        >
          <td>
            <input
              type="radio"
              name="selectedOrder"
              @change="selectOrder(order)"
              :checked="selectedOrder && selectedOrder.number === order.number"
              class="container__radio"
            />
          </td>
          <td>{{ order.number }}</td>
          <td>{{ order.date }}</td>
          <td>{{ order.name }}</td>
          <td>
            <select v-if="isClientManager" v-model="order.status" class="container__status-select">
              <option>Новый</option>
              <option>Составление сметы</option>
              <option>Подтверждение</option>
              <option>Закупка</option>
              <option>Производство</option>
              <option>Контроль</option>
              <option>Готов</option>
              <option>Выполнен</option>
              <option>Отменен</option>
            </select>
            <span v-else>{{ order.status }}</span>
          </td>
          <td>{{ order.price }}</td>
          <td>{{ order.client }}</td>
          <td>{{ order.endDate }}</td>
          <td>{{ order.manager }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="showModal" class="container__modal">
      <div class="container__modal-content">
        <button class="container__close-button" @click="closeModal">✖</button>
        <h3 class="container__modal-heading">
          Редактирование заказа {{ selectedOrder?.number }}
        </h3>
        <label class="container__modal-label">
          <p class="container__modal-label-text">Стоимость</p>
          <input
            type="text"
            v-model="selectedOrder.price"
            placeholder="Введите стоимость заказа"
            class="container__modal-input"
          />
        </label>
        <label class="container__modal-label">
          <p class="container__modal-label-text">Дата завершения заказа:</p>
          <input
            type="text"
            v-model="selectedOrder.endDate"
            class="container__modal-input"
          />
        </label>
        <button @click="saveChanges" class="container__modal-button">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from "@/store/userAuth";

definePageMeta({
  layout: "admin",
});

const authStore = useAuthStore();

const userRole = computed(() => authStore.user?.role || '');

const orders = ref([
  { number: '001', date: '01.10.24', name: 'Торт "Шоколадный рай"', status: 'Новый', price: '-', client: 'Иванов И.И.', endDate: '-', manager: '-' },
  { number: '002', date: '03.10.24', name: 'Торт "Клубничное наслаждение"', status: 'Закупка', price: '7500', client: 'Петрова А.В.', endDate: '15.10.24', manager: 'Петрова Н.В.' },
  { number: '003', date: '05.10.24', name: 'Торт "Малиновый взрыв"', status: 'Производство', price: '6000', client: 'Соколова Е.С.', endDate: '15.10.24', manager: 'Сидоров А.А.' },
]);

const roles = {
  isDirector: 'Директор',
  isCustomer: 'Заказчик',
  isClientManager: 'Менеджер по работе с клиентами',
  isProcurementManager: 'Менеджер по закупкам',
  isMaster: 'Мастер',
};

const roleStatus = Object.fromEntries(
  Object.entries(roles).map(([key, role]) => [
    key,
    computed(() => userRole.value === role),
  ])
);

const isDirector = roleStatus.isDirector; // true, если userRole.value === 'Директор'

const isCustomer = computed(() => {
  console.log('Current user role:', userRole.value); // Логируем текущую роль
  return userRole.value === 'Заказчик';
});

const isClientManager = roleStatus.isClientManager; // true, если userRole.value === 'Менеджер по работе с клиентами'
const isProcurementManager = roleStatus.isProcurementManager; // true, если userRole.value === 'Менеджер по закупкам'
const isMaster = roleStatus.isMaster; // true, если userRole.value === 'Мастер'




const selectedStatus = ref('');
const filteredOrders = computed(() => {
  let ordersList = orders.value;

  if (selectedStatus.value) {
    ordersList = ordersList.filter(order => order.status === selectedStatus.value);
  }

  if (isProcurementManager.value) {
    return ordersList.filter(order => order.status === 'Закупка');
  } else if (isMaster.value) {
    return ordersList.filter(order => ['Производство', 'Контроль'].includes(order.status));
  }

  return ordersList;
});

const showModal = ref(false);
const selectedOrder = ref(null);

function selectOrder(order) {
  selectedOrder.value = order;
}

function openModal() {
  if (selectedOrder.value) {
    showModal.value = true;
  } else {
    alert('Пожалуйста, выберите заказ для редактирования.');
  }
}

function saveChanges() {
  const index = orders.value.findIndex(o => o.number === selectedOrder.value.number);
  if (index !== -1) {
    orders.value[index] = { ...selectedOrder.value };
  }
  closeModal();
}

function closeModal() {
  showModal.value = false;
  selectedOrder.value = null;
}
</script>


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
    width: 360px;
    height: 64px;
    padding: 20px;
    border-radius: 20px;
  }

  &__heading {
    text-align: left;
    width: 1200px;
    font-size: 36px;
    font-weight: 700;
    line-height: 120%;
    margin-bottom: 20px;
  }

  &__styled-table {
    width: 100%;
    max-width: 1200px;
    border-collapse: collapse;
    text-align: left;
    border: 1px solid #FEEEDB;

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

  &__status-select {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  &__button {
    border: 2px solid #CC2B40;
    color: #CC2B40;
    border-radius: 10px;
    width: 360px;
    height: 64px;
    cursor: pointer;

    &--add {
      border: none;
      background-color: #FF8B16;
      color: #FFFFFF;
    }

    &--manager {
      background-color: #FED87F;
      color: #000000;
      border: none;
    }
  }

  &__modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &__modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 1100px;
    height: 542px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 100px;
  }

  &__close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
    background: none;
    border: none;
    color: #333;
  }

  &__modal-heading {
    margin: 0 0 40px 0;
    @include Comic(36px, 700);
  }

  &__modal-label {
    display: block;
    margin-bottom: 10px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    &-text {
      @include Comic(20px, 400);
    }
  }

  &__modal-input {
    height: 64px;
    width: 920px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }

  &__modal-button {
    border: none;
    color: white;
    background-color: #FF8B16;
    border-radius: 8px;
    width: 920px;
    height: 50px;
    cursor: pointer;
  }
  
  .error-message {
    color: red;
    font-size: 12px;
  }
}
</style>
