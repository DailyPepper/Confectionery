<template>
    <div v-if="edit" class="fixed" @click.self="closePopup">
        <div class="popup">
            <SvgoClose class="popup__close" @click="closePopup" />
            <h2 class="popup__title">Edit Role</h2>
            <form class="popup__form" @submit.prevent="handleSubmit">
                <section class="popup__input">
                    <label class="popup__input--label" for="email">Email address:</label>
                    <InputWithLabel
                        id="email"
                        v-model="formEdit.email"
                        :class="{ 'popup__input--error': v$.email.$error }"
                        type="text"
                        placeholder="Enter email address"
                    />
                    <p v-if="v$.email.$error" class="popup__input--message">
                        (Invalid email)
                    </p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="firstName">First name:</label>
                    <InputWithLabel
                        id="firstName"
                        v-model="formEdit.firstName"
                        :class="{ 'popup__input--error': v$.firstName.$error }"
                        type="text"
                        placeholder="Enter first name"
                    />
                    <p v-if="v$.firstName.$error" class="popup__input--message">
                        (First name is required and must be at least 2 characters)
                    </p>
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
                    <p v-if="v$.lastName.$error" class="popup__input--message">
                        (Last name is required and must be at least 2 characters)
                    </p>
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
                    <label class="popup__input--label" for="role">Role:</label>
                    <div class="popup__radio">
                        <label class="popup__radio--label">
                            <input
                                type="radio"
                                name="role"
                                value="User"
                                v-model="formEdit.role"
                                class="popup__radio--input"
                                required
                            />
                            <span class="popup__radio--custom"></span>
                            User
                        </label>
                        <label class="popup__radio--label">
                            <input
                                type="radio"
                                name="role"
                                value="Administrator"
                                v-model="formEdit.role"
                                class="popup__radio--input"
                            />
                            <span class="popup__radio--custom"></span>
                            Administrator
                        </label>
                    </div>
                </section>
                <section class="popup__buttons">
                    <button type="submit" class="popup__buttons--save">Apply</button>
                    <button type="button" class="popup__buttons--cancel" @click="cancelPopup">Cancel</button>
                </section>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import axios from 'axios';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
const offices = ref<Array<{ id: number; title: string }>>([]);

const props = defineProps<{
    edit: boolean;
    userId: number | null; // userId только number
}>();

const emit = defineEmits(['update:edit', 'update:userData']);
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
const formEdit = ref({
    email: '',
    firstName: '',
    lastName: '',
    office: 1,
    role: 2,
});

const rules = {
    email: { required, email },
    firstName: { required, minLength: minLength(2) },
    lastName: { required, minLength: minLength(2) },
    office: { required },
    role: { required }
};

const v$ = useVuelidate(rules, formEdit);

const handleSubmit = async () => {
    v$.value.$touch(); // Проверка валидации формы
    if (v$.value.$invalid) {
        console.error('Форма не прошла валидацию');
        return;
    }

    if (props.userId && typeof props.userId === 'number') {
        try {
            const payload = {
                email: formEdit.value.email,
                first_name: formEdit.value.firstName,
                last_name: formEdit.value.lastName,
                office: formEdit.value.office,
                role: formEdit.value.role === 'User' ? 2 : 1,
            };
            const response = await axios.post(`http://localhost:8080/users/${props.userId}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            emit('update:userData', response.data);
            emit('update:edit', false);
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
            if (error.response) {
                console.error('Данные ответа:', error.response.data);
            }
        }
    } else {
        console.error('Invalid or undefined User ID:', props.userId); // Если userId не валиден
    }
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

const closePopup = () => {
    emit('update:edit', false);
};

const cancelPopup = () => {
    formEdit.value = {
        email: '',
        firstName: '',
        lastName: '',
        office: 1, 
        role: 2, 
    };

    v$.value.$reset();
    closePopup();
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
    height: 940px;
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
        @include Comic(36px, 700);

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
            @include Comic(20px, 400);

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
            @include Comic(20px, 400);

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
            @include Comic(16px, 400);

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

    &__radio {
        display: flex;
        padding: 20px 0;
        gap: 60px;

        &--label {
            @include Comic(16px, 400);

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
            border: 2px solid #C1C7D0;
            border-radius: 50%;
            transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        &--input:checked+&--custom {
            background-color: rgba(25, 106, 166, 1);
            border-color: rgba(25, 106, 166, 1);
        }

        &--custom:after {
            content: "";
            position: absolute;
            display: none;
        }

        &--input:checked+&--custom:after {
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
</style>
