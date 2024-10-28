<template>
    <div v-if="show" class="fixed" @click.self="closePopup">
        <div class="popup">
            <SvgoClose class="popup__close" @click="closePopup" />
            <h2 class="popup__title">
                Редактировать сбой
            </h2>
            <form class="popup__form" @submit.prevent="handleSubmit" method="post">
                <section class="popup__input">
                    <label class="popup__input--label" for="date">
                        Дата начала:
                    </label>
                    <InputWithLabel
                        id="date"
                        :class="{ 'popup__input--error': v$.email.$error }"
                        type="date"
                        placeholder="dd.mm.yyyy"
                    />
                    <!-- <p v-if="v$.email.$error" class="popup__input--message">
                        (Invalid Наименование)
                    </p> -->
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="time">
                        Время начала:
                    </label>
                    <InputWithLabel
                        id="date"
                        :class="{ 'popup__input--error': v$.email.$error }"
                        type="time"
                        placeholder="hh:mm"
                    />
                    <!-- <p v-if="v$.email.$error" class="popup__input--message">
                        (Invalid Наименование)
                    </p> -->
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="office">Причина:</label>
                    <div class="popup__select">
                        <select id="office" v-model="formData.office_id">
                            <option value="">Выберите причину</option>
                        </select>
                        <SvgoSelect class="popup__select--icon" />
                    </div>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="office">Оборудование:</label>
                    <div class="popup__select">
                        <select id="office" v-model="formData.office_id">
                            <option value="">Выберите оборудование</option>
                        </select>
                        <SvgoSelect class="popup__select--icon" />
                    </div>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="date">
                        Дата починки:
                    </label>
                    <InputWithLabel
                        id="date"
                        :class="{ 'popup__input--error': v$.email.$error }"
                        type="date"
                        placeholder="dd.mm.yyyy"
                    />
                    <!-- <p v-if="v$.email.$error" class="popup__input--message">
                        (Invalid Наименование)
                    </p> -->
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="time">
                        Время прочинки:
                    </label>
                    <InputWithLabel
                        id="time"
                        :class="{ 'popup__input--error': v$.email.$error }"
                        type="time"
                        placeholder="hh:mm"
                    />
                    <!-- <p v-if="v$.email.$error" class="popup__input--message">
                        (Invalid Наименование)
                    </p> -->
                </section>

                <section class="popup__buttons">
                    <button type="submit" class="popup__buttons--save">
                        Создать
                    </button>
                </section>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import { required, email, sameAs, minLength } from '@vuelidate/validators';


const props = defineProps({
    show: Boolean,
});

const emit = defineEmits(['update:show', 'userAdded']);

const formData = ref({
    birthdate: '',
    email: '',
    first_name: '',
    last_name: '',
    office_id: '',
    password: '',
    repeat_password: '',
    is_active: true
});

const rules = {
    email: { required, email },
    first_name: { required, minLength: minLength(2) },
    last_name: { required, minLength: minLength(2) },
    birthdate: { required },
    password: { required, minLength: minLength(6) },
    repeat_password: {
        required,
        sameAs: sameAs(computed(() => formData.value.password)),
    }
};

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) return;

    // try {
    //     const response = await fetch('http://localhost:8080/users', {
    //         method: 'POST',
    //         credentials: 'include',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(formData.value),
    //     });

    //     if (response.ok) {
    //         emit('userAdded'); // Уведомляем родительский компонент о добавлении пользователя
    //         emit('update:show', false); // Закрываем модальное окно
    //         resetForm(); // Сбрасываем форму
    //     } else {
    //         // Обработка ошибки ответа, если это необходимо
    //         console.error('Error:', await response.text());
    //     }
    // } catch (error) {
    //     console.error('Error submitting form:', error);
    // }
};

const resetForm = () => {
    formData.value = {
        email: '',
        first_name: '',
        last_name: '',
        office_id: '',
        birthdate: '',
        password: '',
        repeat_password: '',
        is_active: true
    };
    v$.value.$reset(); 
};

const closePopup = () => {
    emit('update:show', false);
};

const cancelPopup = () => {
    resetForm(); 
    closePopup(); 
};

const fetchOffices = async () => {
    // try {
    //     const response = await fetch('http://localhost:8080/offices', {
    //         method: 'GET',
    //         credentials: 'include',
    //     });

    //     if (!response.ok) {
    //         const errorData = await response.text();
    //         console.error(`Error: ${response.status} - ${errorData}`);
    //         throw new Error(`Error: ${response.status}`);
    //     }

    //     const data = await response.json();
    //     offices.value = data;
    //     console.log('Office data:', data);
    // } catch (error) {
    //     console.error('Error fetching offices:', error);
    // }
};

onMounted(() => {
    fetchOffices();
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/fonts' as *;

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
    height: 1065px;
    margin-top: 50px;
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
        }
        &--textarea{
            font-family: Verdana, sans-serif;
            font-weight: 400;
            line-height: normal;
            font-size: 16px;
            width: 100%;
            background-color: #FFFFFF;
            border-radius: 10px;
            transition: border-color 0.3s;
            border: 2px solid #BBB5AD;
            outline: none;
            margin-top: 10px;
            padding: 30px 15px;
            resize: none;
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

        select {
            font-family: Verdana, sans-serif;
            font-weight: 400;
            line-height: normal;
            width: 100%;
            background-color: #FFFFFF;
            border-radius: 10px;
            border: 2px solid #BBB5AD;
            outline: none;
            margin-top: 10px;
            height: 70px;
            background-image: url(/_nuxt/assets/icons/cursor.svg);
            background-repeat: no-repeat;
            background-position: right 24px center;
            appearance: none;
            &:hover {
                background-color: #c1d9fd;
                transition: 0.7s;
            }
        }

        &--icon {
            display: none;
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
            background-color: rgba(255, 139, 22, 1);
            color: rgba(253, 254, 255, 1);
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.5s ease;

            &:hover {
                background-color: rgba(254, 216, 127, 1);
                color: rgba(0, 0, 0, 1);
            }

            &:active {
                background-color: rgba(241, 95, 108, 1);
                color: rgba(255, 255, 255, 1)
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
}
.button{
    display: flex;
    padding-top: 15px;
    gap: 20px;
}
.button__plus{
    width: 450px;
    height: 60px;
    border-radius: 20px;
    color: #FF8B16;
    border: 1px solid #FF8B16;
    font-size: 16px;
    font-weight: 400;
    align-items: center;
}
.button__minus{
    width: 450px;
    height: 60px;
    border-radius: 20px;
    color: #CC2B40;
    border: 1px solid #CC2B40;
    font-size: 16px;
    font-weight: 400;
    align-items: center;
    transition: background-color 0.3s, color 0.3s; 
}
.button__add{
    width: 910px;
    height: 60px;
    border-radius: 20px;
    background-color: #BBB5AD;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 400;
    align-items: center;
    transition: background-color 0.3s, color 0.3s; 
}
</style>
