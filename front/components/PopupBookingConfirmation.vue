<template>
  <div v-if="edit" class="fixed" @click.self="closePopup">
    <div v-if="!showNewModal" class="popup">
      <SvgoClose class="popup__close" @click="closePopup" />
      <h2 class="popup__title">Booking confirmation</h2>
      <section class="section">
        <div class="section__there">
          <h3 class="section__there--head">Outbound flight details:</h3>
          <ul class="section__there--list">
            <li v-for="flight in typedSelectedFlights" :key="'outbound-' + flight.schedule_id">
              <span>From:</span>
              <b>{{ flight.from }}</b>
            </li>
            <li v-for="flight in typedSelectedFlights" :key="'outbound-to-' + flight.schedule_id">
              <span>To:</span>
              <b>{{ flight.to }}</b>
            </li>
            <li v-for="flight in typedSelectedFlights" :key="'outbound-date-' + flight.schedule_id">
              <span>Date:</span>
              <b>{{ flight.date }}</b>
            </li>
            <li v-for="flight in typedSelectedFlights" :key="'outbound-flight-number-' + flight.schedule_id">
              <span>Flight number:</span>
              <b>{{ flight.flight_number }}</b>
            </li>
          </ul>
        </div>
        <div class="section__there">
          <h3 class="section__there--head">Return flight details:</h3>
          <ul class="section__there--list">
            <li v-for="flight in typedSelectedFlights" :key="'return-' + flight.schedule_id">
              <span>From:</span>
              <b>{{ flight.from }}</b>
            </li>
            <li v-for="flight in typedSelectedFlights" :key="'return-to-' + flight.schedule_id">
              <span>To:</span>
              <b>{{ flight.to }}</b>
            </li>
            <li v-for="flight in typedSelectedFlights" :key="'return-date-' + flight.schedule_id">
              <span>Date:</span>
              <b>{{ flight.date }}</b>
            </li>
            <li v-for="flight in typedSelectedFlights" :key="'return-flight-number-' + flight.schedule_id">
              <span>Flight number:</span>
              <b>{{ flight.flight_number }}</b>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <h2 class="popup__heading">Passenger details</h2>
        <form class="popup__form" @submit.prevent="handleSubmit">
          <div class="popup__form--first">
            <section class="popup__input">
              <label class="popup__input--label" for="firstname">Firstname:</label>
              <InputWithLabel
                id="firstName"
                v-model="formEdit.firstName"
                :class="{ 'popup__input--error': v$.firstName.$error }"
                type="text"
                placeholder="Enter firstname"
              />
              <span v-if="v$.firstName.$error" class="error-message">Firstname is required.</span>
            </section>

            <section class="popup__input">
              <label class="popup__input--label" for="lastName">Last name:</label>
              <InputWithLabel
                id="lastName"
                v-model="formEdit.lastName"
                :class="{ 'popup__input--error': v$.lastName.$error }"
                type="text"
                placeholder="Enter last name"
              />
              <span v-if="v$.lastName.$error" class="error-message">Last name is required.</span>
            </section>

            <section class="popup__input">
              <label class="popup__input--label" for="birthdate">Birthdate:</label>
              <InputWithLabel
                id="birthdate"
                v-model="formEdit.birthdate"
                :class="{ 'popup__input--error': v$.birthdate.$error }"
                type="text"
                placeholder="yyyy-mm-dd"
              />
              <span v-if="v$.birthdate.$error" class="error-message">Valid birthdate is required.</span>
            </section>
          </div>
          <div class="popup__form--first">
            <section class="popup__input">
              <label class="popup__input--label" for="passport_number">Passport number:</label>
              <InputWithLabel
                id="passport_number"
                v-model="formEdit.passportNumber"
                :class="{ 'popup__input--error': v$.passportNumber.$error }"
                type="text"
                placeholder="xxxxxxxx"
              />
              <span v-if="v$.passportNumber.$error" class="error-message">Passport number is required.</span>
            </section>

            <section class="popup__input">
              <label class="popup__input--label" for="passport_type">Passport country:</label>
              <Select v-model="formEdit.passportType" />
            </section>

            <section class="popup__input">
              <label class="popup__input--label" for="phone">Phone:</label>
              <InputWithLabel
                id="phone"
                v-model="formEdit.phone"
                :class="{ 'popup__input--error': v$.phone.$error }"
                type="text"
                placeholder="Enter phone"
              />
              <span v-if="v$.phone.$error" class="error-message">Phone number is required.</span>
            </section>
          </div>
          <div class="popup__container">
            <button class="popup__button">Add passenger</button>
          </div>
          <section>
            <h2 class="popup__heading">Passenger list</h2>
            <div class="flight-schedule">
              <table class="flight-schedule__table">
                <thead>
                  <tr class="flight-schedule__header-row">
                    <th class="flight-schedule__header-cell">Select</th>
                    <th class="flight-schedule__header-cell">From</th>
                    <th class="flight-schedule__header-cell">To</th>
                    <th class="flight-schedule__header-cell">Date</th>
                    <th class="flight-schedule__header-cell">Time</th>
                    <th class="flight-schedule__header-cell">Flight Number(s)</th>
                    <th class="flight-schedule__header-cell">Cabin Price, $</th>
                    <th class="flight-schedule__header-cell">Number of stops</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="flight in typedSelectedFlights" :key="'passenger-' + flight.schedule_id">
                    <td class="flight-schedule__cell">
                      <CheckboxInput :id="'checkbox-' + flight.schedule_id" />
                    </td>
                    <td class="flight-schedule__cell">{{ flight.from }}</td>
                    <td class="flight-schedule__cell">{{ flight.to }}</td>
                    <td class="flight-schedule__cell">{{ flight.date }}</td>
                    <td class="flight-schedule__cell">{{ flight.time }}</td>
                    <td class="flight-schedule__cell">{{ flight.flight_number }}</td>
                    <td class="flight-schedule__cell">{{ flight.price }}</td>
                    <td class="flight-schedule__cell">{{ flight.duration }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="popup__container">
              <button class="popup__buttons--cancel popup__buttons--cancel--second">Remove passenger</button>
            </div>
          </section>
          <section class="popup__buttons">
            <button type="button" class="popup__buttons--save" @click="handleSubmit">Confirm booking</button>
            <button type="button" class="popup__buttons--cancel" @click="closePopup">Back to search for flights</button>
          </section>
        </form>
      </section>

    </div>
    <div v-if="showNewModal" class="popup popup__second">
      <SvgoClose class="popup__close" @click="closePopup" />
      <h2 class="popup__title">Booking confirmed</h2>
      <section class="section">
        <form action="">
          <section class="payment-summary">
            <p class="payment-summary__total">Total amount: <span class="payment-summary__amount">$960</span></p>
            <p class="payment-summary__method-title">Paid using:</p>
            <ul class="payment-summary__methods">
              <li class="payment-summary__method">
                <input id="paid-credit" type="radio" name="payment-method" class="payment-summary__radio">
                <label for="paid-credit" class="payment-summary__label">Credit Card</label>
              </li>
              <li class="payment-summary__method">
                <input id="paid-cash" type="radio" name="payment-method" class="payment-summary__radio">
                <label for="paid-cash" class="payment-summary__label">Cash</label>
              </li>
              <li class="payment-summary__method">
                <input id="paid-voucher" type="radio" name="payment-method" class="payment-summary__radio">
                <label for="paid-voucher" class="payment-summary__label">Voucher</label>
              </li>
            </ul>
          </section>
          <section class="popup__buttons">
            <button type="button" class="popup__buttons--save">Issue tickets</button>
            <button type="button" class="popup__buttons--cancel" @click="closePopup">Back to search for flights</button>
          </section>
        </form>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import type { Flight } from "~/types";
import { computed, defineProps, ref } from 'vue';
import axios from "axios";

const emit = defineEmits(["update:edit"]);

const formEdit = ref({
  email: "",
  firstName: "",
  lastName: "",
  birthdate: "",
  passportNumber: "",
  passportType: "",
  phone: "",
});

const props = defineProps<{
  edit: boolean;
  selectedFlights: Flight[];
}>();

const isDateValid = helpers.regex(
  /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
  "Invalid date format (yyyy-mm-dd)"
);

const rules = {
  email: { required, email },
  firstName: { required },
  lastName: { required },
  birthdate: { required, isDateValid },
  passportNumber: { required, minLength: minLength(5) },
  passportType: { required },
  phone: { required, minLength: minLength(10) },
};

const v$ = useVuelidate(rules, formEdit);
const showNewModal = ref(false);

function closePopup() {
  emit("update:edit", false);
  showNewModal.value = false; 
}

const handleSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:8080/flights/book', {
      cabin_type: 1,
      schedule_ids: typedSelectedFlights.value.map(flight => flight.schedule_id),
      passengers: [
        {
          first_name: formEdit.value.firstName,
          last_name: formEdit.value.lastName,
          birth_date: formEdit.value.birthdate,
          passport_number: formEdit.value.passportNumber,
          passport_country_id: formEdit.value.passportType,
          phone: formEdit.value.phone,
        }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    console.log('Booking confirmed:', response.data);
    showNewModal.value = true;
    resetForm();
  } catch (error) {
    console.error('Error during booking:', error);
  }
};


const resetForm = () => {
  formEdit.value = {
    email: "",
    firstName: "",
    lastName: "",
    birthdate: "",
    passportNumber: "",
    passportType: "",
    phone: "",
  };
};

const typedSelectedFlights = computed(() => props.selectedFlights);

</script>

<style lang="scss" scoped>
@use '@/assets/scss/fonts' as *;

.popup__input {
  max-width: 283px;
}

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
  height: 1250px;
  margin-top: 50px;
  padding: 80px 100px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 40px;

  &__second {
    height: 450px;
  }

  .nuxt-icon.popup__close {
    position: absolute;
    width: 12px;
    height: 12px;
    top: 48px;
    right: 48px;
    cursor: pointer;
  }

  &__title {
    @include adventor-font(36px, 700);

    color: rgba(5, 17, 37, 1);
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__input {
    position: relative;
    display: flex;
    flex-direction: column;

    &--label {
      @include verdana-font(20px, 400);

      color: rgba(5, 17, 37, 1);
    }

    input,
    select {
      font-size: 16px !important;
      padding: 22.5px 20px !important;
    }

    label {
      margin: 0 !important;
    }

    .input-with-label__toggle-password {
      width: 18px;
      right: 20px;
    }

    &--error input {
      border: 2px solid red !important;
    }

    &--message {
      @include verdana-font(20px, 400);

      position: absolute;
      right: 0;
      color: red;
      margin-top: 4px;
    }
  }

  &__select {
    position: relative;
    display: flex;
    align-items: center;
    font-size: 16px !important;
    select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 100%;
      border: none;
      outline: none;
      background-color: #f7f8fa;
      border-radius: 20px;
      color: #878A8F;
      &:hover {
        background-color: #c1d9fd;
      }
    }

    &--icon {
      position: absolute;
      right: 20px;
      pointer-events: none;
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }

  &__buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;

    &--save {
      @include verdana-font(20px, 400);

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
      @include verdana-font(20px, 400);

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

  &__radio {
    display: flex;
    padding: 20px 0;
    gap: 60px;

    &--label {
      @include verdana-font(16px, 400);

      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      padding-left: 30px;
      user-select: none;
    }

    &--input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    &--custom {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 20px;
      width: 20px;
      background-color: white;
      border: 2px solid #c1c7d0;
      border-radius: 50%;
      transition: background-color 0.2s ease, border-color 0.2s ease;
    }

    &--input:checked + &--custom {
      background-color: rgba(25, 106, 166, 1);
      border-color: rgba(25, 106, 166, 1);
    }

    &--custom:after {
      content: "";
      position: absolute;
      display: none;
    }

    &--input:checked + &--custom:after {
      display: block;
    }

    &--custom:after {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  }
}
.section {
  display: flex;
  flex-direction: column;
  gap: 25px;

  &__there {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  &__there--head {
    font-size: 20px;
    font-weight: initial;
  }
  &__there--list {
    display: flex;
    gap: 40px;
    font-size: 16px;
  }
}

.popup__form--first {
    display: flex;
    gap: 30px;    
}

.popup__heading {
    width: 100%;
    display: flex;
    justify-content: center;
    @include adventor-font(28px, 700);
    margin-bottom: 30px;
}

.popup__button {
  @include adventor-font(20px, 400);
  border-radius: 10px;
  padding: 20px 80px;
  background-color: #196AA6;
  color: #FDFEFF;
}

.popup__container {
  display: flex;
  flex-direction: row-reverse;
}

.flight-schedule {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;
  @include verdana-font(16px, 400);

  &__title {
    @include adventor-font(36px, 700);

    margin-bottom: 20px;
    color: #051125;
  }

  thead {
    background-color: #d7e0f980;
  }

  table {
    background-color: #fff;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 9px 18.2px 0px #0000001c;

    th,
    td {
      padding: 12px;
      text-align: left;
      vertical-align: middle;
    }

    .flight-schedule__row--blocked {
      background-color: rgba(230, 39, 52, 1);
      color: white;
    }
  }

  td:first-child {
    text-align: center;
    width: 50px;
  }
}

.popup__buttons--cancel--second {
  width: 40%;
}

.payment-summary {
  &__total {
    @include verdana-font(16px, 400);
    margin-bottom: 10px;
  }

  &__amount {
    @include verdana-font(16px, 700);
  }

  &__method-title {
    @include verdana-font(16px, 400);
    margin-top: 40px;
    margin-bottom: 10px;
  }

  &__methods {
    list-style: none;
    display: flex;
    gap: 40px;
    margin-bottom: 40px;
  }

  &__method {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  &__radio {
    margin-right: 10px;
  }

  &__label {
    cursor: pointer;
    @include verdana-font(16px, 400);
  }
}

</style>