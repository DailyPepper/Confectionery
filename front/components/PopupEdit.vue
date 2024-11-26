<template>
    <div v-if="show" class="fixed" @click.self="closePopup">
        <div class="popup">
            <SvgoClose class="popup__close" @click="closePopup" />
            <h2 class="popup__title">Редактирование</h2>
            <form class="popup__form" @submit.prevent="handleSubmit">
                <section class="popup__input">
                    <label class="popup__input--label" for="sku">
                        Артикул:
                    </label>
                    <input id="sku" v-model="formData.sku" class="popup__input--item"
                        :class="{ 'popup__input--error': v$.sku.$error }" type="text" placeholder="00000000" />
                    <p v-if="v$.sku.$error" class="popup__input--message">
                        (Артикул обязателен)
                    </p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="type">
                        Тип:
                    </label>
                    <div class="popup__select">
                        <select id="type" v-model="formData.type">
                            <option disabled value="">
                                Выберите тип
                            </option>
                            <option v-for="type in useToppings.toppingsType" :key="type.id" :value="type.id"
                                class="header__select--option">
                                {{ type.name }}
                            </option>
                        </select>
                        <SvgoSelect class="popup__select--icon" />
                    </div>
                    <p v-if="v$.type.$error" class="popup__input--message">
                        (Тип обязателен)
                    </p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="ingredient">
                        Наименование:
                    </label>
                    <input id="ingredient" v-model="formData.ingredient" class="popup__input--item"
                        :class="{ 'popup__input--error': v$.ingredient.$error }" type="text"
                        placeholder="Введите наименование ингредиента" />
                    <p v-if="v$.ingredient.$error" class="popup__input--message">
                        (Ингредиент обязателен)
                    </p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="quantity">
                        Количество:
                    </label>
                    <input id="quantity" v-model="formData.quantity" class="popup__input--item"
                        :class="{ 'popup__input--error': v$.quantity.$error }" type="number"
                        placeholder="Введите количество" />
                    <p v-if="v$.quantity.$error" class="popup__input--message">
                        (Количество обязательно)
                    </p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="unit">
                        Единицы измерения:
                    </label>
                    <input id="unit" v-model="formData.unit" class="popup__input--item"
                        :class="{ 'popup__input--error': v$.unit.$error }" type="text"
                        placeholder="Введите единицы измерения" />
                    <p v-if="v$.unit.$error" class="popup__input--message">
                        (Единицы измерения обязательны)
                    </p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="price">
                        Закупочная цена:
                    </label>
                    <input id="price" v-model="formData.price" class="popup__input--item"
                        :class="{ 'popup__input--error': v$.price.$error }" type="number" placeholder="Введите цену" />
                    <p v-if="v$.price.$error" class="popup__input--message">
                        (Цена обязательна)
                    </p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="supplier">
                        Поставщик:
                    </label>
                    <input id="supplier" v-model="formData.supplier" class="popup__input--item"
                        :class="{ 'popup__input--error': v$.supplier.$error }" type="text"
                        placeholder="Введите поставщика" />
                    <p v-if="v$.supplier.$error" class="popup__input--message">
                        (Поставщик обязателен)
                    </p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="deliveryDate">
                        Дата доставки:
                    </label>
                    <input id="deliveryDate" v-model="formData.deliveryDate" class="popup__input--item"
                        :class="{ 'popup__input--error': v$.deliveryDate.$error }" type="date" />
                    <p v-if="v$.deliveryDate.$error" class="popup__input--message">
                        (Дата доставки обязательна)
                    </p>
                </section>

                <section class="popup__input">
                    <label class="popup__input--label" for="deliveryDate">
                        Срок годности до:
                    </label>
                    <input id="deliveryDate" v-model="formData.expirationDate" class="popup__input--item"
                        :class="{ 'popup__input--error': v$.expirationDate.$error }" type="date" />
                    <p v-if="v$.expirationDate.$error" class="popup__input--message">
                        (Срок годности обязателен)
                    </p>
                </section>

                <section class="popup__buttons">
                    <button type="submit" class="popup__buttons--save">
                        Создать
                    </button>
                    <button type="button" class="popup__buttons--cancel" @click="cancelPopup">
                        Отмена
                    </button>
                </section>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import { required, minLength } from '@vuelidate/validators';
import { useToppingsStore } from '~/store/fetchToppings';
import type { Toppings } from '~/types';

const useToppings = useToppingsStore()

const props = defineProps<{
    show: boolean;
    editItem: Toppings | null;
}>();

const emit = defineEmits(['update:show', 'toppingEdited']);

const formData = reactive({
    idTopping: props.editItem?.id || 0,
    sku: props.editItem?.article || '',
    type: props.editItem?.typeId || null,
    ingredient: props.editItem?.name || '',
    quantity: props.editItem?.quantity || null,
    unit: props.editItem?.unit || null,
    price: props.editItem?.purchasePrice || null,
    supplier: props.editItem?.supplierId || null,
    deliveryDate: props.editItem?.deliveryDuration || null,
    expirationDate: props.editItem?.shelfLife || null,
});

watch(() => props.editItem, (newEditItem) => {
    if (newEditItem) {
        formData.idTopping = newEditItem.id || 0;
        formData.sku = newEditItem.article || '';
        formData.type = newEditItem.typeId || null;
        formData.ingredient = newEditItem.name || '';
        formData.quantity = newEditItem.quantity || null;
        formData.unit = newEditItem.unit || null;
        formData.price = newEditItem.purchasePrice || null;
        formData.supplier = newEditItem.supplierId || null;
        formData.deliveryDate = newEditItem.deliveryDuration || null;
        formData.expirationDate = newEditItem.shelfLife || null;
    }
}, { immediate: true });

const rules = {
    sku: { required, minLength: minLength(1) },
    type: { required },
    ingredient: { required },
    quantity: {},
    unit: {},
    price: {},
    supplier: {},
    deliveryDate: {},
    expirationDate: {}
};

const v$ = useVuelidate(rules, formData);

const handleSubmit = async () => {
    v$.value.$touch()
    if (v$.value.$invalid) return

    if (props.editItem) {
        await useToppings.editToppings({
            article: formData.sku,
            //@ts-ignore
            typeId: formData.type,
            name: formData.ingredient,
            //@ts-ignore
            quantity: formData.quantity,
            //@ts-ignore
            unit: formData.unit,
            //@ts-ignore
            purchasePrice: formData.price,
            //@ts-ignore
            supplierId: formData.supplier,
            //@ts-ignore
            deliveryDuration: formData.deliveryDate,
            //@ts-ignore
            shelfLife: formData.expirationDate,
        }, Number(formData.idTopping));
    }
    closePopup();
}

const resetForm = () => {
    formData.idTopping = 0;
    formData.sku = '';
    formData.type = 0;
    formData.ingredient = '';
    formData.quantity = 0;
    formData.unit = 0;
    formData.price = 0;
    formData.supplier = 0;
    formData.deliveryDate = 0;
    formData.expirationDate = 0;
};

const closePopup = () => {
    emit('update:show', false);
    resetForm()
};

const cancelPopup = () => {
    closePopup();
};
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
    background-color: rgba(41, 3, 6, 0.8);
    display: flex;
    justify-content: center;
}

.popup {
    position: absolute;
    z-index: 100;
    width: 1110px;
    height: 1450px;
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

        &--item {
            @include Comic(16px, 400);

            width: 100%;
            border: none;
            background-color: #FFFFFF;
            border-radius: 10px;
            margin-top: 10px;
            padding: 22.5px 20px;
            transition: border-color 0.3s;
            padding-right: 50px;
            border: 2px solid #BBB5AD;

            &:focus {
                border-color: rgb(144, 80, 16);
            }
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
            padding: 22.5px 20px;
            background-color: #FFFFFF;
            border: 2px solid #BBB5AD;
            border-radius: 10px;
            margin-top: 10px;
            transition: border-color 0.3s;
            outline: none;

            &:focus {
                border-color: rgb(144, 80, 16);
            }
        }

        &--icon {
            position: absolute;
            right: 20px;
            bottom: 30%;
            pointer-events: none;
            width: 16px;
            height: 16px;
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
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.5s ease;

            &:hover {
                background-color: rgb(189, 105, 21);
            }

            &:active {
                background-color: rgb(144, 80, 16);
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
