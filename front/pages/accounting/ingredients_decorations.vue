<template>
    <div class="ingredients-page">
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
            <button @click="toggleDelete" class="action-buttons__button action-buttons__button--cancel">
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
    <PopupDelete
        v-model:show="isPopupDeleteVisible"
        @update:show="isPopupDeleteVisible = false"
    />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "admin",
});

const isPopupVisible = ref(false);
const isPopupDeleteVisible = ref(false);

const togglePopup = () => {
    isPopupVisible.value = !isPopupVisible.value;
};

const toggleDelete = () => {
    isPopupDeleteVisible.value = !isPopupDeleteVisible.value;
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
        }

        &:active {
            background-color: rgb(144, 80, 16);
        }

        &--cancel {
            border: 1px solid #e62734;
            background-color: #fff;
            color: #e62734;

            &:hover {
                background-color: #fff;
                transition: 0.5s;
            }

            &:active {
                background-color: #fff;
            }
        }
    }

    &__icon {
        width: 24px;
        height: 24px;
    }
}
</style>
