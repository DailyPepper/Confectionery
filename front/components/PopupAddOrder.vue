<template>
    <div
        v-if="show"
        class="fixed"
        @click.self="closePopup"
    >
        <div class="popup">
            <SvgoClose
                class="popup__close"
                @click="closePopup"
            />
            <h2 class="popup__title">Добавить заказ</h2>
            <form
                class="popup__form"
                @submit.prevent="handleSubmit"
            >
                <section class="popup__input">
                    <label
                        class="popup__input--label"
                        for="sku"
                    >
                        Наименование:
                    </label>
                    <input
                        id="sku"
                        v-model="formData.name"
                        class="popup__input--item"
                        :class="{ 'popup__input--error': v$.name.$error }"
                        type="text"
                        placeholder="Введите наименование"
                    />
                    <p
                        v-if="v$.name.$error"
                        class="popup__input--message"
                    >
                        (Наименование обязательно)
                    </p>
                </section>

                <section class="popup__input">
                    <label
                        class="popup__input--label"
                        for="ingredient"
                    >
                        Описание:
                    </label>
                    <textarea
                        id="ingredient"
                        v-model="formData.about"
                        class="popup__input--textarea"
                        :class="{ 'popup__input--error': v$.about.$error }"
                        type="text"
                        placeholder="Введите описание изделия"
                    />
                    <p
                        v-if="v$.about.$error"
                        class="popup__input--message"
                    >
                        (Описание обязательно)
                    </p>
                </section>

                <section class="popup__input">
                    <label
                        class="popup__input--label"
                        for="quantity"
                    >
                        Размеры изделия (ширина):
                    </label>
                    <input
                        id="quantity"
                        v-model="formData.width"
                        class="popup__input--item"
                        :class="{ 'popup__input--error': v$.width.$error }"
                        type="number"
                        placeholder="Введите число"
                    />
                    <p
                        v-if="v$.width.$error"
                        class="popup__input--message"
                    >
                        (Размер обязателен)
                    </p>
                </section>

                <section class="popup__input">
                    <label
                        class="popup__input--label"
                        for="unit"
                    >
                        Размеры изделия (высота):
                    </label>
                    <input
                        id="unit"
                        v-model="formData.height"
                        class="popup__input--item"
                        :class="{ 'popup__input--error': v$.height.$error }"
                        type="number"
                        placeholder="Введите единицы измерения"
                    />
                    <p
                        v-if="v$.height.$error"
                        class="popup__input--message"
                    >
                        (Размеры обязательны)
                    </p>
                </section>

                <section class="popup__input">
                    <label
                        class="popup__input--label"
                        for="price"
                    >
                        Единицы измерения:
                    </label>
                    <input
                        id="price"
                        v-model="formData.unit"
                        class="popup__input--item"
                        :class="{ 'popup__input--error': v$.unit.$error }"
                        type="number"
                        placeholder="см/мм"
                    />
                    <p
                        v-if="v$.unit.$error"
                        class="popup__input--message"
                    >
                        (Единицы измерения обязательны)
                    </p>
                </section>

                <section class="popup__input">
                    <input
                        id="file"
                        type="file"
                        accept=".jpeg, .png"
                        @change="handleFileUpload"
                        class="popup__input--file"
                    />

                    <label
                        for="file"
                        class="popup__input--file-label"
                    >
                        <SvgoAddFile
                            class="popup__input--svg-label"
                            filled
                        />
                        <h3 class="popup__input--title-label">Загрузите фотографии референсов</h3>
                        <p class="popup__input--text-label">Формат: JPEG, PNG</p>
                    </label>

                    <div
                        v-if="selectedFile"
                        class="popup__input--file-information"
                    >
                        <p class="popup__input--preview-text">Загружены</p>

                        <div class="popup__input--preview">
                            <p>{{ selectedFile.name }}</p>
                        </div>

                        <SvgoKrest
                            v-if="selectedFile"
                            class="popup__input--svg"
                            @click="removeFile"
                            filled
                        />
                    </div>
                    <p
                        v-if="fileError"
                        class="popup__input--message-label"
                    >
                        {{ fileError }}
                    </p>
                </section>

                <section class="popup__buttons">
                    <button
                        type="submit"
                        class="popup__buttons--save"
                    >
                        Создать
                    </button>
                    <button
                        type="button"
                        class="popup__buttons--cancel"
                        @click="cancelPopup"
                    >
                        Отмена
                    </button>
                </section>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';

defineProps({
    show: Boolean,
});

const emit = defineEmits(['update:show']);

const formData = ref({
    name: '',
    about: '',
    width: '',
    height: '',
    unit: '',
});

const rules = {
    name: { required, minLength: minLength(2) },
    about: { required, minLength: minLength(2) },
    width: { required, minLength: minLength(1) },
    height: { required, minLength: minLength(2) },
    unit: { required, minLength: minLength(5), maxLength: maxLength(5) },
};

const v$ = useVuelidate(rules, formData);

const resetForm = () => {
    formData.value = {
        name: '',
        about: '',
        width: '',
        height: '',
        unit: '',
    };
    v$.value.$reset();
};

const selectedFile = ref<File | null>(null);
const fileError = ref<string | null>(null);

const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
        selectedFile.value = file;
        fileError.value = null;
    } else {
        fileError.value = 'Только форматы JPEG и PNG допускаются.';
        selectedFile.value = null;
    }
};

const removeFile = () => {
    selectedFile.value = null;
};

const handleSubmit = () => {
    v$.value.$touch()

    if (v$.value.$invalid) return

    if (!selectedFile.value) {
        fileError.value = 'Файл обязателен';
        return;
    }

    emit('update:show', false)
    console.log(formData.value)
}

const closePopup = () => {
    emit('update:show', false);
};

const cancelPopup = () => {
    resetForm();
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
    height: 1300px;
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

        &--item,
        &--textarea,
        &--preview {
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

        &--textarea {
            height: 100px;
            outline: none;
            resize: none;
        }

        &--file {
            position: relative;
            opacity: 0;
            width: 0;
            height: 0;
            z-index: -1;
        }

        &--file-label {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            padding: 20px;
            border: 2px solid #bbb5ad;
            border-radius: 10px;
            height: 183px;
            width: 100%;
            text-align: center;
        }

        &--svg-label {
            cursor: pointer;
            width: 70px;
            height: 60px;
        }

        &--title-label {
            @include Comic(20px, 400);

            margin-top: 15px;
        }

        &--text-label {
            @include Comic(16px, 400);

            margin-top: 15px;
            color: rgba(103, 103, 103, 1);
        }

        &--file-information {
            position: relative;
        }

        &--preview-text {
            @include Comic(20px, 400);

            margin-top: 30px;
            color: rgba(103, 103, 103, 1);
        }

        &--preview {
            border: 2px solid rgba(0, 183, 131, 1);
        }

        &--svg {
            position: absolute;
            cursor: pointer;
            right: 23px;
            top: 85px;
            width: 25px;
            height: 25px;
        }

        &--message-label {
            color: red;
            font-size: 20px;
            text-align: center;
        }

        &--message {
            color: red;
            font-size: 14px;
            margin-top: 5px;
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
