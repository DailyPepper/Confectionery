<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";
import * as chartConfig from "@/store/chartConfig";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const isPopupFailure = ref(false);
const isPopupEdit = ref(false);
const isGraf = ref(false);
const chartData = chartConfig.data;

const showPopupFailure = () => {
  isPopupFailure.value = true;
};

const showPopupEdit = () => {
  isPopupEdit.value = true;
};

const showGraf = () => {
  isGraf.value = !isGraf.value;
};

definePageMeta({
  layout: "admin",
});
</script>

<template>
  <PopupFailure
    v-if="isPopupFailure"
    :show="isPopupFailure"
    @update:show="isPopupFailure = false"
  />
  <PopupFailureEdit
    v-if="isPopupEdit"
    :show="isPopupEdit"
    @update:show="isPopupEdit = false"
  />
  <section class="container">
    <div class="result-section">
      <div class="block">
        <div style="display: flex; gap: 20px">
          <button class="block__button" @click="showPopupFailure">
            <SvgoPlusAdd style="color: #ff8b16" />
            <span> Добавить </span>
          </button>
          <button class="block__edit" @click="showPopupEdit">
            <SvgoEditFailures style="color: white" />
            <span> Редактировать </span>
          </button>
          <button class="block__edit">
            <SvgoImport />
            <span> Печать отчета </span>
          </button>
          <button class="block__edit" @click="showGraf">
            <SvgoGraf style="color: white" />
            <span> Вывести график </span>
          </button>
        </div>

        <div style="display: flex; gap: 20px">
          <select name="" id="" class="block__select">
            <option value="Выберите статус">Выберите дату</option>
          </select>

          <select name="" id="" class="block__select">
            <option value="Выберите статус">Выберите временной промежуток</option>
          </select>

          <select name="" id="" class="block__select">
            <option value="Выберите статус" disabled>Выберите причину</option>
            <option value="Ошибка программного обеспечения">
              Ошибка программного обеспечения
            </option>
            <option value="Сбой в электропитании">Сбой в электропитании</option>
            <option value="Поломка конвейера">Поломка конвейера</option>
            <option value="Перегрев двигателя">Перегрев двигателя</option>
          </select>
        </div>
      </div>

      <Bar v-if="isGraf" :data="chartData" />

      <section class="section">
        <h2>Ошибка программного обеспечения</h2>
        <table>
          <thead>
            <tr class="container__head">
              <td></td>
              <td>Дата cбоя</td>
              <td>Время сбоя</td>
              <td>Причина</td>
              <td>Оборудование</td>
              <td>Дата починки</td>
              <td>Время починки</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>17.10.24</td>
              <td>13:30</td>
              <td>Ошибка программного обеспечения</td>
              <td>Станок резки</td>
              <td>17.10.24</td>
              <td>14:15</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>17.10.24</td>
              <td>13:30</td>
              <td>Ошибка программного обеспечения</td>
              <td>Станок резки</td>
              <td>17.10.24</td>
              <td>14:15</td>
            </tr>
          </tbody>
        </table>
        <p class="section__text">Суммарное время сбоев - 45 мин</p>
      </section>

      <section class="section">
        <h2>Сбой в электропитании</h2>
        <table>
          <thead>
            <tr class="container__head">
              <td></td>
              <td>Дата cбоя</td>
              <td>Время сбоя</td>
              <td>Причина</td>
              <td>Оборудование</td>
              <td>Дата починки</td>
              <td>Время починки</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>17.10.24</td>
              <td>13:30</td>
              <td>Ошибка программного обеспечения</td>
              <td>Станок резки</td>
              <td>17.10.24</td>
              <td>14:15</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>17.10.24</td>
              <td>13:30</td>
              <td>Ошибка программного обеспечения</td>
              <td>Станок резки</td>
              <td>17.10.24</td>
              <td>14:15</td>
            </tr>
          </tbody>
        </table>
        <p class="section__text">Суммарное время сбоев - 25 мин</p>
      </section>

      <section class="section">
        <h2>Поломка конвейера</h2>
        <table>
          <thead>
            <tr class="container__head">
              <td></td>
              <td>Дата cбоя</td>
              <td>Время сбоя</td>
              <td>Причина</td>
              <td>Оборудование</td>
              <td>Дата починки</td>
              <td>Время починки</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>17.10.24</td>
              <td>13:30</td>
              <td>Ошибка программного обеспечения</td>
              <td>Станок резки</td>
              <td>17.10.24</td>
              <td>14:15</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>17.10.24</td>
              <td>13:30</td>
              <td>Ошибка программного обеспечения</td>
              <td>Станок резки</td>
              <td>17.10.24</td>
              <td>14:15</td>
            </tr>
          </tbody>
        </table>
        <p class="section__text">Суммарное время сбоев - 45 мин</p>
      </section>

      <section class="section">
        <h2>Перегрев двигателя</h2>
        <table>
          <thead>
            <tr class="container__head">
              <td></td>
              <td>Дата cбоя</td>
              <td>Время сбоя</td>
              <td>Причина</td>
              <td>Оборудование</td>
              <td>Дата починки</td>
              <td>Время починки</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>17.10.24</td>
              <td>13:30</td>
              <td>Ошибка программного обеспечения</td>
              <td>Станок резки</td>
              <td>17.10.24</td>
              <td>14:15</td>
            </tr>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>17.10.24</td>
              <td>13:30</td>
              <td>Ошибка программного обеспечения</td>
              <td>Станок резки</td>
              <td>17.10.24</td>
              <td>14:15</td>
            </tr>
          </tbody>
        </table>
        <p class="section__text">Суммарное время сбоев - 5 ч 25 мин</p>
      </section>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/scss/_fonts' as *;

.container {
  display: flex;
  justify-content: center;
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
  padding-top: 80px;
  h2 {
    @include Comic(36px, 700);
    margin-bottom: 20px;
  }

  table {
    @include Comic(16px, 400);
    width: 100%;
    background-color: #f9f9f9;
    border-collapse: collapse;
    overflow: hidden;
    /* box-shadow: 0px 9px 18.2px 0px rgba(0, 0, 0, 0.1098039216); */
    margin-top: 50px;

    th,
    td {
      padding: 12px;
      text-align: left;
      vertical-align: middle;
    }
    tr {
      border: 2px solid rgba(254, 238, 219, 1);
    }
    .container__head {
      border-radius: 10px;
      background-color: rgba(254, 238, 219, 1);
    }

    .regular {
      background-color: rgba(255, 255, 255, 1);
    }

    .admin {
      background-color: rgba(35, 156, 151, 0.5);
    }

    .highlight {
      background-color: rgba(230, 39, 52, 1);
      color: #fff;
    }
  }

  td:first-child {
    text-align: center;
    width: 50px;
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

.block {
  border: 1px solid #948f89;
  border-radius: 20px;
  max-width: 1235px;
  margin-bottom: 50px;
  padding: 25px 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
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
</style>
