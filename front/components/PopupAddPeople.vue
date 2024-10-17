<template>
    <div v-if="show" class="fixed" @click.self="closePopup">
        <div class="popup">
            <SvgoClose class="popup__close" @click="closePopup" />
            <h2 class="popup__title">Add User</h2>
            <form class="popup__form" @submit.prevent="handleSubmit">
                <section class="popup__input">
                    <label class="popup__input--label" for="email">Email address:</label>
                    <InputWithLabel
                        id="email"
                        v-model="formData.email"
                        :class="{ 'popup__input--error': v$.email.$error }"
                        type="text"
                        placeholder="Enter email address"
                    />
                    <p v-if="v$.email.$error" class="popup__input--message">(Invalid email)</p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="firstName">First name:</label>
                    <InputWithLabel
                        id="firstName"
                        v-model="formData.first_name"
                        :class="{ 'popup__input--error': v$.first_name.$error }"
                        type="text"
                        placeholder="Enter first name"
                    />
                    <p v-if="v$.first_name.$error" class="popup__input--message">(First name is required)</p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="lastName">Last name:</label>
                    <InputWithLabel
                        id="lastName"
                        v-model="formData.last_name"
                        :class="{ 'popup__input--error': v$.last_name.$error }"
                        type="text"
                        placeholder="Enter last name"
                    />
                    <p v-if="v$.last_name.$error" class="popup__input--message">(Last name is required)</p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="office">Office:</label>
                    <div class="popup__select">
                        <select id="office" v-model="formData.office_id">
                            <option value="">Select Office</option>
                            <option 
                                v-for="office in offices" 
                                :key="office.id" 
                                :value="office.id" 
                                class="header__select--option"
                            >
                                {{ office.title }}
                            </option>
                        </select>
                        <SvgoSelect class="popup__select--icon" />
                    </div>
                </section>
                
                <section class="popup__input">
                    <label class="popup__input--label" for="birthdate">Birthdate:</label>
                    <InputWithLabel
                        id="birthdate"
                        v-model="formData.birthdate"
                        :class="{ 'popup__input--error': v$.birthdate.$error }"
                        type="date"
                    />
                    <p v-if="v$.birthdate.$error" class="popup__input--message">(Birthdate is required)</p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="password">Password:</label>
                    <InputWithLabel
                        id="password"
                        v-model="formData.password"
                        :class="{ 'popup__input--error': v$.password.$error }"
                        type="password"
                        placeholder="Enter password"
                    />
                    <p v-if="v$.password.$error" class="popup__input--message">(Password is required)</p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="repeatPassword">Repeat the password:</label>
                    <InputWithLabel
                        id="repeatPassword"
                        v-model="formData.repeat_password"
                        :class="{ 'popup__input--error': v$.repeat_password.$error }"
                        type="password"
                        placeholder="Repeat password"
                    />
                    <p v-if="v$.repeat_password.$error" class="popup__input--message">(Passwords do not match)</p>
                </section>

                <section class="popup__buttons">
                    <button type="submit" class="popup__buttons--save">Save</button>
                    <button type="button" class="popup__buttons--cancel" @click="cancelPopup">Cancel</button>
                </section>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, sameAs, minLength } from '@vuelidate/validators';

const offices = ref<Array<{ id: number; title: string }>>([]);

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

    try {
        const response = await fetch('http://localhost:8080/users', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData.value),
        });

        if (response.ok) {
            emit('userAdded'); // Уведомляем родительский компонент о добавлении пользователя
            emit('update:show', false); // Закрываем модальное окно
            resetForm(); // Сбрасываем форму
        } else {
            // Обработка ошибки ответа, если это необходимо
            console.error('Error:', await response.text());
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
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
    try {
        const response = await fetch('http://localhost:8080/offices', {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error(`Error: ${response.status} - ${errorData}`);
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        offices.value = data;
        console.log('Office data:', data);
    } catch (error) {
        console.error('Error fetching offices:', error);
    }
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
    height: 1270px;
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

        select {
            @include verdana-font(16px, 400);
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            width: 100%;
            border: none;
            outline: none;
            background-color: #f7f8fa;
            border-radius: 20px;

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
}
</style>
