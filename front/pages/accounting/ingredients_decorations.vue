<template>
    <div class="ingredients-page">
        <div class="filter-grid">
            <div class="filter-grid__item">
                <select
                    id="airport-select"
                    class="filter-grid__select"
                    v-model="selectedType"
                >
                    <option
                        disabled
                        value=""
                    >
                        Тип
                    </option>
                    <option
                        v-for="type in types"
                        :key="type.id"
                        :value="type.id"
                    >
                        {{ type.name }}
                    </option>
                </select>
            </div>

            <div class="filter-grid__item">
                <input
                    type="text"
                    id="outbound-date"
                    class="filter-grid__input date-input"
                    placeholder="Введите срок годности до"
                    v-model="outboundDate"
                />
            </div>

            <div class="filter-grid__item">
                <button
                    class="filter-grid__button"
                    @click="toggleAddPopup"
                >
                    Найти
                </button>
            </div>
        </div>

        <div class="table-decorations">
            <h2 class="table-decorations__title">Результат {{ tableData.length }} - {{ priceDecor }} руб</h2>
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
                        <th class="table-decorations__header-cell">Business Price</th>
                        <th class="table-decorations__header-cell">Срок годности</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(item, index) in filteredData"
                        :key="index"
                    >
                        <td class="table-decorations__cell">
                            <CheckboxInput
                                :id="item.article"
                                :value="item"
                                v-model="selectedItems"
                            />
                        </td>
                        <td class="table-decorations__cell">{{ item.article || '—' }}</td>
                        <td class="table-decorations__cell">{{ item.name || '—' }}</td>
                        <td class="table-decorations__cell">{{ item.quantity || '—' }}</td>
                        <td class="table-decorations__cell">{{ item.unit || '—' }}</td>
                        <td class="table-decorations__cell">{{ item.purchasePrice || '—' }}</td>
                        <td class="table-decorations__cell">{{ item.supplier || '—' }}</td>
                        <td class="table-decorations__cell">{{ item.deliveryDate || '—' }}</td>
                        <td class="table-decorations__cell">{{ item.businessPrice || '—' }}</td>
                        <td class="table-decorations__cell">{{ item.expiryDate || '—' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="action-buttons">
            <button
                class="action-buttons__button action-buttons__button--edit"
                @click="togglePopup"
            >
                <SvgoEdit
                    class="action-buttons__icon"
                    alt="Edit ingredients"
                    filled
                />
                Редактирование
            </button>
            <button
                @click="confirmDeleteItems"
                class="action-buttons__button action-buttons__button--cancel"
            >
                <SvgoKrest
                    class="action-buttons__icon"
                    alt="Remove ingredients"
                    filled
                />
                Удалить
            </button>
        </div>
    </div>
    <PopupEdit
        v-model:show="isPopupVisible"
        @update:show="isPopupVisible = false"
    />
    <PopupAddOrder
        v-model:show="isPopupAddVisible"
        @update:show="isPopupAddVisible = false"
    />
    <PopupDelete
        v-model:show="isPopupDeleteVisible"
        @confirm-delete="deleteSelectedItems"
        @cancel="isPopupDeleteVisible = false"
        :items="selectedItemName"
    />
</template>

<script setup lang="ts">
import type { TableItem } from '~/types';

definePageMeta({
    layout: "admin",
});

const selectedType = ref('');
const outboundDate = ref('');
const selectedItems = ref<TableItem[]>([]);
const isPopupVisible = ref(false);
const isPopupDeleteVisible = ref(false);
const isPopupAddVisible = ref(false);
const selectedItemName = ref('');

const types = [
    { id: '1', name: 'Обычный' },
    { id: '2', name: 'Срочный' }
];

const tableData = ref<TableItem[]>([
    { article: '0534318', name: 'Яйцо второй категории (45-55 гр.)', quantity: null, unit: null, purchasePrice: 42, supplier: null, deliveryDate: null, businessPrice: null, expiryDate: null },
    { article: '00234234', name: 'Паста-пюре фрукт.КОНФРУТТИ НАТУР садов.ягоды ', quantity: 20, unit: 'кг', purchasePrice: 828, supplier: null, deliveryDate: null, businessPrice: null, expiryDate: null },
    { article: '00544', name: 'Свеча-цифра 23046-0', quantity: 10, unit: 'шт', purchasePrice: null, supplier: null, deliveryDate: null, businessPrice: null, expiryDate: null },
    { article: '00008518', name: 'Вафельный рожок 110 225шт.', quantity: 4, unit: 'упак', purchasePrice: null, supplier: null, deliveryDate: null, businessPrice: null, expiryDate: null },
]);

const priceDecor = ref(tableData.value.reduce((acc, item) => acc + (item.purchasePrice || 0), 0))

const filteredData = ref(tableData.value);

const handleSearch = () => {
    console.log('Selected Type:', selectedType.value);
    console.log('Outbound Date:', outboundDate.value);
};

const togglePopup = () => {
    isPopupVisible.value = !isPopupVisible.value;
};

const toggleAddPopup = () => {
    isPopupAddVisible.value = !isPopupAddVisible.value;
};

const confirmDeleteItems = () => {
    if (selectedItems.value.length > 0) {
        selectedItemName.value = selectedItems.value.map(item => item.name).join(', ');
        isPopupDeleteVisible.value = true;
    }
};

const deleteSelectedItems = () => {
    tableData.value = tableData.value.filter(item => !selectedItems.value.includes(item));
    selectedItems.value = [];
    isPopupDeleteVisible.value = false;
};
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
        @include verdana-font(20px, 400);

        margin-bottom: 10px;
    }

    &__item {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    &__input {
        @include verdana-font(16px, 400);

        color: #051125;
        width: 367px;
        height: 64px;
        border: 2px solid rgba(187, 181, 173, 1);
        border-radius: 20px;
        padding: 20px;
        outline: none;
    }

    &__button {
        @include adventor-font(16px, 400);

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
        @include verdana-font(16px, 400);

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
    @include verdana-font(16px, 400);

    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;

    &__title {
        @include adventor-font(36px, 700);

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
    gap: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
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
        @include adventor-font(16px, 400);

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

        &--cancel {
            border: 2px solid #e62734;
            background-color: #fff;
            color: #e62734;

            &:hover {
                border: 2px solid #cc6a6a;
                background-color: white;
                transition: 0.5s;
            }
        }
    }

    &__icon {
        width: 24px;
        height: 24px;
    }
}
</style>
