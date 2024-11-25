<template>
    <div v-if="show" class="fixed" @click.self="closePopup">
        <div class="popup">
            <SvgoClose class="popup__close" @click="cancelPopup" />
            <h2 class="popup__title">
                Добавить инструмент
            </h2>
            <form class="popup__form" @submit.prevent="handleSubmit" method="post">
                <section class="popup__input">
                    <label class="popup__input--label" for="email">
                        Наименование:
                    </label>
                    <InputWithLabel
                        v-model="formData.name"
                        id="name"
                        :class="{ 'popup__input--error': v$.name.$error }"
                        type="text"
                        placeholder="Введите наименование"
                    />
                    <p v-if="v$.name.$error" class="popup__input--message">
                        (Неправильное наименование)
                    </p>
                </section>

                <section class="popup__input">
                    <label id="description" class="popup__input--label" for="firstName">Описание:</label>
                    <textarea 
                        v-model="formData.description"
                        name="description" 
                        id="description"
                        type="text"
                        placeholder="Введите описание"
                        class="popup__input--textarea"
                    />
                    <p v-if="v$.description.$error" class="popup__input--message">
                        (Неправильное описание)
                    </p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="type">Тип инструмента:</label>
                    <div class="popup__select">
                        <select 
                            v-model="formData.type"
                            id="type" 
                            required 
                            class="popup__select--block"
                        >
                            <option 
                                value="" 
                                disabled 
                                selected 
                                hidden
                            >
                                Выберите тип инструмента
                            </option>
                            <option 
                                v-for="type in useFilters.toolsTypes" 
                                :key="type.id"
                                :value="type.id" 
                                class="header__select--option"
                            >
                                {{ type.name }}
                            </option>
                        </select>
                    </div>
                    <p v-if="v$.type.$error" class="popup__input--message">
                        (Неправильный тип инструмента)
                    </p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="wear">Степень износа:</label>
                    <div class="popup__select">
                        <select 
                            id="wear" 
                            required 
                            v-model="formData.wear" 
                            class="popup__select--block"
                        >
                            <option 
                                value="" 
                                disabled 
                                selected 
                                hidden
                            >
                                Выберите степень износа
                            </option>
                            <option 
                                v-for="wear in wears" 
                                :key="wear.id" 
                                :value="wear.value" 
                                class="header__select--option"
                            >
                                {{ wear.title }}
                            </option>
                        </select>
                    </div>
                    <p v-if="v$.wear.$error" class="popup__input--message">(Неправильная степень износа)</p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="supplier">Поставщик:</label>
                    <div class="popup__select">
                        <select 
                            id="supplier" 
                            required 
                            v-model="formData.supplier" 
                            class="popup__select--block"
                        >
                            <option 
                                value="" 
                                disabled 
                                selected 
                                hidden
                            >
                                Выберите поставщика
                            </option>
                            <option 
                                v-for="supplier in useFilters.suppliers" 
                                :key="supplier.id" 
                                :value="supplier.id" 
                                class="header__select--option"
                            >
                                {{ supplier.name }}
                            </option>
                        </select>
                    </div>
                    <p v-if="v$.supplier.$error" class="popup__input--message">(Неправильная поставщик)</p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="date">Дата приобретения:</label>
                    <InputWithLabel
                        id="date"
                        v-model="formData.date"
                        :class="{ 'popup__input--error': v$.date.$error }"
                        type="date"
                    />
                    <p v-if="v$.date.$error" class="popup__input--message">(Неправильная дата)</p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="count">Количество в наличии:</label>
                    <InputWithLabel
                        id="count"
                        v-model="formData.count"
                        :class="{ 'popup__input--error': v$.count.$error }"
                        type="number"
                        placeholder="Введите число"
                    />
                    <p v-if="v$.count.$error" class="popup__input--message">(Неправильное количество)</p>
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
import { required, minLength } from '@vuelidate/validators';
import { useToolStore } from '~/store/AddTool';
import { useFilterStore } from '~/store/fetchTool';

defineProps({
    show: Boolean,
});

const emit = defineEmits(['update:show', 'userAdded']);
const useFilters = useFilterStore()
const useTool = useToolStore()

const wears = [ 
    {
        id: 1,
        title: "Новый",
        value: "NEW",
    },
    {
        id: 2,
        title: "Б/У",
        value: "USED",
    },
    {
        id: 3,
        title: "Изношенный",
        value: "WORN",
    },
]

const formData = ref({
    name: '',
    description: '',
    type: '',
    wear: '',
    supplier: '',
    date: '',
    count: '',
});

const rules = {
    name: { required, minLength: minLength(2) },
    description: { required, minLength: minLength(2) },
    type: { required },
    wear: { required },
    supplier: { required },
    date: { required },
    count: { required, minLength: minLength(1) }
};

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) return;

    try {
        await useTool.addTool({
            name: formData.value.name,
            description: formData.value.description,
            supplierId: parseInt(formData.value.supplier),
            wear: formData.value.wear,
            typeId: parseInt(formData.value.type),
            purchaseDate: formData.value.date,
            quantity: parseInt(formData.value.count),
        })
    } catch (error) {
        console.log('Ошибка добавления: ', error);
    }

    closePopup()
};

const resetForm = () => {
    formData.value = {
        name: '',
        description: '',
        type: '',
        wear: '',
        supplier: '',
        date: '',
        count: '',
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

onMounted(() => {
    useFilters.fetchTypes(),
    useFilters.fetchSuppliers()
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
    height: 1230px;
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
</style>
