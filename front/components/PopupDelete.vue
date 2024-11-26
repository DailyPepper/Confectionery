<template>
    <div v-if="show" class="fixed" @click.self="closePopup">
        <div class="popup">
            <SvgoClose class="popup__close" @click="closePopup" />

            <div class="popup__title">
                <p class="popup__title--item">Вы уверенны, что хотите удалить</p>
                <ul v-if="deleteItem?.article">
                    <li class="popup__title--item">
                        {{ deleteItem.name }}
                    </li>
                </ul>
            </div>

            <button type="button" class="popup__delete" @click="handleDelete">
                <SvgoDelete class="popup__delete--icon" alt="Remove ingredients" filled />
                Удалить
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useToppingsStore } from '~/store/fetchToppings';
import type { Toppings } from '~/types';

const props = defineProps<{
    show: boolean;
    deleteItem: Toppings | null;
}>();

const useToppings = useToppingsStore()
const emit = defineEmits(['update:show', 'confirm-delete']);

const formData = reactive({
    idTopping: props.deleteItem?.id || '',
    name: props.deleteItem?.name || '',
});

const handleDelete = async () => {
    if (props.deleteItem) {
        await useToppings.deleteToppings(Number(formData.idTopping));
    }
    closePopup();
}

const closePopup = () => {
    emit('update:show', false);
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
    width: 808px;
    height: 342px;
    margin-top: 300px;
    padding: 80px 100px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 60px;

    .nuxt-icon.popup__close {
        position: absolute;
        width: 12px;
        height: 12px;
        top: 48px;
        right: 48px;
        cursor: pointer;
    }

    &__title {
        @include Comic(20px, 400);

        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    &__delete {
        @include Comic(16px, 400);

        display: flex;
        justify-content: center;
        gap: 10px;
        width: 488px;
        margin: 0 auto;
        padding: 20px;
        background-color: rgba(204, 43, 64, 1);
        color: white;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.5s ease;

        &:hover {
            background-color: rgb(139, 30, 44);
        }

        &:active {
            background-color: rgb(96, 20, 30);
        }

        .nuxt-icon.popup__delete--icon {
            width: 20px;
            height: 20px;
        }
    }
}
</style>
