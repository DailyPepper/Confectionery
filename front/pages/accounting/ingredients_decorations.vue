<template>
    <div class="ingredients-page">
        <div class="filter-grid">
            <div class="filter-grid__item">
                <select id="airport-select" class="filter-grid__select" v-model="selectedType">
                    <option disabled value="">
                        Тип
                    </option>
                    <option v-for="type in useToppings.toppingsType" :key="type.id" :value="type.id">
                        {{ type.name }}
                    </option>
                </select>
            </div>

            <div class="filter-grid__item">
                <input type="text" id="outbound-date" class="filter-grid__input date-input"
                    placeholder="Введите срок годности до" v-model="outboundDate" />
            </div>

            <div class="filter-grid__item">
                <button class="filter-grid__button">
                    Найти
                </button>
            </div>
        </div>

        <div class="table-decorations">
            <h2 class="table-decorations__title">Результат {{ useToppings.toppings.length }} - {{
                useToppings.toppings.reduce((acc, item) => acc + (item.purchasePrice || 0), 0).toFixed(2) }} руб</h2>
            <table class="table-decorations__table">
                <thead>
                    <tr class="table-decorations__header-row">
                        <th class="table-decorations__header-cell"></th>
                        <th class="table-decorations__header-cell">Артикул</th>
                        <th class="table-decorations__header-cell">Наименование</th>
                        <th class="table-decorations__header-cell">Кол-во</th>
                        <th class="table-decorations__header-cell">Един. измер.</th>
                        <th class="table-decorations__header-cell">Закуп. цена</th>
                        <th class="table-decorations__header-cell">Поставщик</th>
                        <th class="table-decorations__header-cell">Срок доставки</th>
                        <th class="table-decorations__header-cell">Срок годности</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in useToppings.toppings" :key="item.article">
                        <td class="table-decorations__cell">
                            <CheckboxInput :id="String(item.id)" :value="item"
                                :model-value="selectedItem?.id === item.id"
                                @update:modelValue="toggleSelection(item, $event)" />
                        </td>
                        <td class="table-decorations__cell">{{ item.article || '—' }}</td>
                        <td class="table-decorations__cell">{{ item.name || '—' }}</td>
                        <td class="table-decorations__cell">{{ item.quantity || '—' }}</td>
                        <td class="table-decorations__cell">{{ item.unit || '—' }}</td>
                        <td class="table-decorations__cell">{{ item.purchasePrice || '—' }}</td>
                        <td class="table-decorations__cell">{{ item.supplierId || '—' }}</td>
                        <td class="table-decorations__cell">{{ item.deliveryDuration || '—' }}</td>
                        <td class="table-decorations__cell">{{ item.shelfLife || '—' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="useAuth.user" class="action-buttons">
            <button class="action-buttons__button action-buttons__button--edit" @click="togglePopup"
                :disabled="useAuth.user.role !== 'Директор' && useAuth.user.role !== 'Менеджер по закупкам'">
                <SvgoEdit class="action-buttons__icon" alt="Edit ingredients" filled />
                Редактирование
            </button>
            <button class="action-buttons__button action-buttons__button--cancel" @click="toggleDeletePopup"
                :disabled="useAuth.user.role !== 'Директор' && useAuth.user.role !== 'Менеджер по закупкам' && !selectedItem">
                <SvgoKrest class="action-buttons__icon" alt="Remove ingredients" filled />
                Удалить
            </button>
        </div>
    </div>
    <PopupEdit v-if="selectedItem" :edit-item="selectedItem" v-model:show="isPopupVisible"
        @update:show="isPopupVisible = false" />
    <PopupDelete v-if="selectedItem" :delete-item="selectedItem" v-model:show="isPopupDeleteVisible"
        @update:show="isPopupDeleteVisible = false" />
</template>

<script setup lang="ts">
import { useToppingsStore } from '~/store/fetchToppings';
import { useAuthStore } from '~/store/userAuth';
import type { Toppings } from '~/types';

const useAuth = useAuthStore()

definePageMeta({
    layout: "admin",
});

const useToppings = useToppingsStore()

const selectedType = ref('');
const outboundDate = ref('');
const selectedItem = ref<Toppings | null>(null);
const isPopupVisible = ref(false);
const isPopupDeleteVisible = ref(false);

const toggleSelection = (item: Toppings, isSelected: boolean) => {
    if (isSelected) {
        selectedItem.value = item;
    } else {
        selectedItem.value = null;
    }
};

const togglePopup = () => {
    if (selectedItem.value) isPopupVisible.value = true;
};

const toggleDeletePopup = () => {
    isPopupDeleteVisible.value = !isPopupDeleteVisible.value;
};

onMounted(() => {
    useToppings.fetchToopings()
    useToppings.fetchTypes()
    useAuth.initialize()
})
</script>

<style scoped lang="scss">
@use '@/assets/scss/_fonts' as *;

.ingredients-page {
    height: 960px;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.filter-grid {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    gap: 20px;
    width: 1200px;
    padding: 30px;
    border: 1px solid rgba(187, 181, 173, 1);
    border-radius: 20px;
    box-shadow: 0px 9px 18.2px 0px #0000001c;
    margin-bottom: 64px;

    &__text {
        @include Comic(20px, 400);

        margin-bottom: 10px;
    }

    &__item {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    &__input {
        @include Comic(16px, 400);

        color: #051125;
        width: 367px;
        height: 64px;
        border: 2px solid rgba(187, 181, 173, 1);
        border-radius: 20px;
        padding: 20px;
        outline: none;
    }

    &__button {
        @include Comic(16px, 400);

        color: black;
        width: 367px;
        height: 64px;
        background-color: rgba(254, 216, 127, 1);
        border-radius: 20px;
        transition: all .2s ease;

        &:hover {
            background-color: rgb(234, 199, 116);
        }

        &:focus {
            background-color: rgb(199, 169, 100);
        }
    }

    &__select {
        @include Comic(16px, 400);

        color: #051125;
        width: 367px;
        height: 64px;
        border: 2px solid rgba(187, 181, 173, 1);
        border-radius: 20px;
        padding: 20px;
        outline: none;
        appearance: none;
    }
}

.table-decorations {
    @include Comic(16px, 400);

    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;

    &__title {
        @include Comic(36px, 700);

        margin-bottom: 20px;
        color: #051125;
    }

    thead {
        background-color: rgba(254, 238, 219, 1);
    }

    table {
        border-collapse: collapse;
        overflow: hidden;
        box-shadow: 0px 9px 18.2px 0px #0000001c;

        th,
        td {
            padding: 12px;
            text-align: left;
            vertical-align: middle;
        }
    }

    td:first-child {
        text-align: center;
        width: 50px;
    }
}

.action-buttons {
    position: fixed;
    gap: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    bottom: 10px;
    width: 1200px;
    margin: 40px auto;
    border-radius: 20px;
    padding: 30px;
    border: 1px solid rgba(187, 181, 173, 1);
    background-color: #fff;
    box-shadow: 0px 9px 18.2px 0px rgba(0, 0, 0, 0.1098039216);
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__button {
        @include Comic(16px, 400);

        width: 555px;
        height: 64px;
        border-radius: 10px;
        padding: 20px;
        background-color: rgba(255, 139, 22, 1);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        &:hover {
            background-color: rgb(189, 105, 21);
            transition: 0.5s;
        }

        &:active {
            background-color: rgb(144, 80, 16);
            transition: 0.5s;
        }

        &:disabled {
            background-color: #BBB5AD;
            cursor: not-allowed;
        }

        &--cancel {
            border: 2px solid #e62734;
            background-color: #fff;
            color: #e62734;

            &:hover {
                border: 2px solid #cc6a6a;
                background-color: white;
                transition: 0.5s;
            }

            &:disabled {
                background-color: #e1e0df;
                cursor: not-allowed;
            }
        }
    }

    &__icon {
        width: 24px;
        height: 24px;
    }
}
</style>
