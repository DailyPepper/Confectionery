<template>
  <div v-if="show" class="fixed" @click.self="closePopup">
    <div class="popup">
      <SvgoClose class="popup__close" @click="closePopup" />
      <h2 class="popup__title">Schedule edit</h2>
      <form class="popup__form" @submit.prevent="handleSubmit">
        <section class="flight-route">
          <p class="flight-route__title">Flight route:</p>
          <div class="flight-route__details">
            <p class="flight-route__from">
              From: 
              <span class="bold">{{ props.flight ? props.flight?.from : 'Нету данных' }}</span> 
            </p>
            <p class="flight-route__to">
              To: 
              <span class="bold">{{ props.flight ? props.flight?.to : 'Нету данных' }}</span>
            </p>
            <p class="flight-route__aircraft">
              Aircraft: 
              <span class="bold">Boeing</span>
            </p>
          </div>
        </section>
        <div class="popup__container">
          <section class="popup__input">
            <label class="filter-grid__text" for="outbound-date">Outbound:</label>
            <input
              type="text"
              id="outbound-date"
              class="filter-grid__input date-input"
              placeholder="dd/mm/yyyy"
              v-model="flightDate"
            />
          </section>
          <section class="popup__input">
            <label class="filter-grid__text" for="flight-number">Flight Number:</label>
            <input
              type="text"
              id="flight-number"
              class="filter-grid__input flight-input"
              placeholder="xxxx"
              v-model="flightNumber"
            />
          </section>
          <section class="popup__input">
            <label class="filter-grid__text" for="economy-price">Economy price: $</label>
            <input
              type="text"
              id="economy-price"
              class="filter-grid__input"
              v-model="economyPrice"
            />
          </section>
        </div>
        <section class="popup__buttons">
          <button type="submit" class="popup__buttons--save">Update</button>
          <button type="button" class="popup__buttons--cancel" @click="cancelPopup">Cancel</button>
        </section>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Flight } from '~/types';
import axios from 'axios'; 
import { useFlightManage } from "~/store/flightManage";

const props = defineProps<{ show: boolean; flight: Flight | null }>();
const emit = defineEmits(["update:show"]);
const flightManage = useFlightManage();

const flightDate = ref(props.flight?.date || "");
const flightNumber = ref(props.flight?.flight_number || "");
const economyPrice = ref(props.flight?.price || "");

const closePopup = () => {
  emit("update:show", false);
};

const sendPostRequest = async () => {
  if (props.flight?.schedule_id) {
    const url = `http://localhost:8080/schedules/${props.flight.schedule_id}`;
    
    // Что ожидает сервер 
    // {
    // "date": "12/02/2017",
    // "time": "21:12",
    // "economy_price": 100.0
    // } 

    const requestData = {
      date: flightDate.value,
      time: flightNumber.value,
      economy_price: Number(economyPrice.value),
    };
    try {
      const response = await axios.post(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, 
      });

      console.log('Update successful:', response.data);
      await flightManage.fetchFlightsData();
    } catch (error) {
      if (error) {
        console.error(error);
      }
      alert('An error occurred while updating the flight. Please check the console for details.');
    }
  } else {
    console.log("Flight ID is missing");
  }
};

const handleSubmit = async () => {
  await sendPostRequest();
  closePopup();
};

const cancelPopup = () => {
  closePopup();
};
</script>

<style lang="scss">
@use '@/assets/scss/_fonts' as *;

.fixed {
  position: fixed;
  overflow: auto;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(5, 17, 37, 0.8);
  display: flex;
  justify-content: center;
}

.popup {
  position: absolute;
  z-index: 100;
  width: 1110px;
  height: 556px;
  margin: 220px auto;
  padding: 80px 100px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 40px;

  .nuxt-icon.popup__close {
    position: absolute;
    width: 12px;
    height: 12px;
    top: 48px;
    right: 48px;
    cursor: pointer;
  }

  &__container {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  &__title {
    @include Comic(36px, 700);

    color: rgba(5, 17, 37, 1);
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;

    &--save {
      @include Comic(20px, 400);

      width: 100%;
      padding: 20px 30px;
      background-color: #0066cc;
      color: rgba(253, 254, 255, 1);
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.5s ease;

      &:hover {
        background-color: #f77d20;
      }

      &:active {
        background-color: #0e4771;
      }
    }

    &--cancel {
      @include Comic(20px, 400);

      width: 100%;
      padding: 20px 30px;
      color: rgba(230, 39, 52, 1);
      border: 2px solid rgba(230, 39, 52, 1);
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.5s ease;

      &:hover {
        background-color: #e62734;
        color: #fdfeff;
      }

      &:active {
        background-color: #a61923;
        color: #fdfeff;
      }
    }
  }
}

.filter-grid__text {
  @include Comic(20px, 400);

  margin-bottom: 10px;
}

.filter-grid__input {
  @include Comic(16px, 400);

  color: #051125;
  background-color: #f7f8fa;
  width: 296px;
  height: 64px;
  border: none;
  border-radius: 15px;
  padding: 20px;
  outline: none;
  appearance: none;
  margin-top: 10px;
}

.flight-route {
  &__title {
    @include Comic(20px, 400);

    margin-bottom: 20px;
  }

  &__details {
    display: flex;
    gap: 60px;
    margin-bottom: 20px;
  }

  &__from {
    @include Comic(16px, 400);

    color: #051125;
  }

  &__to {
    @include Comic(16px, 400);

    color: #051125;
  }

  &__aircraft {
    @include Comic(16px, 400);

    color: #051125;
  }
}

.bold {
  @include Comic(16px, 700);
}
</style>
