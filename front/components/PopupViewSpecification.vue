<template>
    <div v-if="show" class="fixed" @click.self="closePopup">
        <div class="popup">
            <SvgoClose class="popup__close" @click="closePopup" />
            <h2 class="popup__title">
                Просмотр спецификации
            </h2>
            <form class="popup__form" @submit.prevent="handleSubmit" method="post">

                <section class="popup__input">
                    <h3 class="popup__head">
                        Наименование от заказчика
                    </h3>
                    <span class="popup__text">
                        Торт “Рафаэль”
                    </span>
                    <button 
                        type="button"
                        class="input-section__button"
                        @click="fileInputClick"
                    >
                        <SvgoUpload style="width: 70px; height: 60px; color: rgba(187, 181, 173, 1);"/>
                        <span>
                            Загрузите фотографии референсов
                        </span>
                        <p style="color: rgba(103, 103, 103, 1);">
                            Формат: JPEG, PNG
                        </p>
                    </button>
                    <label class="popup__input--label" for="time">
                        Загружены
                    </label>
                    <div class="input-container">
                        <img 
                            src="../assets/icons/del-input.svg" 
                            class="icon-upload"
                            @click="handleDeleteIcon"
                        >
                        <input
                            type="text"
                            class="input-section__input"
                            :class="{ 'input-section__input--filled': isFileUploaded }"
                            :value="isFileUploaded ? fileName : 'Нет загруженных файлов'"
                            readonly
                        >
                    </div>
                    <input
                        type="file"
                        id="schedule-file"
                        accept="image/png, image/jpeg"
                        ref="fileInput"
                        @change="handleFileChange"
                        style="display: none;"
                    />
                    <!-- <p v-if="v$.email.$error" class="popup__input--message">
                        (Invalid Наименование)
                    </p> -->
                </section>

                <section class="popup__input">
                    <h3 class="header__block">
                        Размеры:
                    </h3>
                        <div>
                            <label class="popup__input--label" for="time">
                                Размер:
                            </label>
                            <div class="popup__select">
                                <select id="office" v-model="formData.office_id">
                                    <option value="">Выберите оборудование</option>
                                </select>
                                <SvgoSelect class="popup__select--icon" />
                            </div>
                        </div>
                        <div>
                            <label for="num" style="font-size: 12px;color: rgba(148, 143, 137, 1);">
                                *Ингредиент измеряется в см
                            </label>
                            <InputWithLabel
                                id="num"
                                :class="{ 'popup__input--error': v$.email.$error }"
                                type="number"
                                placeholder="45"
                            />
                        </div>

                    <!-- <button class="popup__buttons--filling">
                        Добавить размер
                    </button> -->
                </section>

                <section class="popup__input">
                    <div>
                        <label class="popup__input--label" for="time">
                            Название спецификации:
                        </label>
                        <InputWithLabel
                            :class="{ 'popup__input--error': v$.email.$error }"
                            type="text"
                            placeholder="Торт “Рафаэль” (готовый заказ)"
                        />
                    </div>
                    <div>
                        <label class="popup__input--label" for="time">
                            Полуфабрикаты:
                        </label>
                        <div class="popup__select">
                            <select id="office" v-model="formData.office_id">
                                <option value="">Выберите полуфабрикат</option>
                            </select>
                            <SvgoSelect class="popup__select--icon" />
                        </div>
                    </div>
                    <!-- <button class="popup__buttons--filling">
                        Добавить полуфабрикат
                    </button> -->
                </section>

                <section class="popup__input">
                    <h3 class="header__block">
                        Ингредиенты:
                    </h3>
                        <div>
                            <label class="popup__input--label" for="time">
                                Тип ингредиента:
                            </label>
                            <div class="popup__select">
                                <select id="office" v-model="formData.office_id">
                                    <option value="">Кокосовая стружка</option>
                                </select>
                                <SvgoSelect class="popup__select--icon" />
                            </div>
                        </div>
                        <div>
                            <label class="popup__input--label" for="time">
                                Ингредиент:
                            </label>
                            <div class="popup__select">
                                <select id="office" v-model="formData.office_id">
                                    <option value="">Кокосовая стружка "Медиум"</option>
                                </select>
                                <SvgoSelect class="popup__select--icon" />
                            </div>
                        </div>
                        <div>
                            <label for="number" style="font-size: 12px;color: rgba(148, 143, 137, 1);">
                                *Ингредиент измеряется в г
                            </label>
                            <InputWithLabel
                                id="number"
                                :class="{ 'popup__input--error': v$.email.$error }"
                                type="number"
                                placeholder="30"
                            />
                        </div>

                    <!-- <button class="popup__buttons--filling">
                        Добавить ингредиент
                    </button> -->
                </section>

                <section class="popup__input">
                    <h3 class="header__block">
                        Украшения:
                    </h3>
                    <div>
                        <label class="popup__input--label" for="time">
                            Тип украшения:
                        </label>
                        <div class="popup__select">
                            <select id="office" v-model="formData.office_id">
                                <option value="">Выберите тип украшения</option>
                            </select>
                            <SvgoSelect class="popup__select--icon" />
                        </div>
                    </div>
                    <!-- <button class="popup__buttons--filling">
                        Добавить украшение
                    </button> -->
                </section>

                <section class="popup__input">
                    <h3 class="header__block">
                        Операции:
                    </h3>
                        <div>
                            <label class="popup__input--label" for="time">
                                Введите название операции:
                            </label>
                            <InputWithLabel
                                id="text"
                                :class="{ 'popup__input--error': v$.email.$error }"
                                type="text"
                                placeholder="Название"
                            />
                            <div class="popup__select">
                                <select id="office" v-model="formData.office_id">
                                    <option value="">Выберите тип оборудование</option>
                                </select>
                                <SvgoSelect class="popup__select--icon" />
                            </div>
                            <InputWithLabel
                                id="number"
                                :class="{ 'popup__input--error': v$.email.$error }"
                                type="number"
                                placeholder="Время на операцию в мин"
                            />
                        </div>
                    <!-- <button class="popup__buttons--filling">
                        Добавить ингредиент
                    </button> -->
                </section>

                <section class="popup__buttons">
                    <!-- <button type="submit" class="popup__buttons--save">
                        Сохранить
                    </button> -->
                    <button type="submit" class="popup__buttons--down">
                        Скачать спецификацию
                    </button>
                </section>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import { required, email, sameAs, minLength } from '@vuelidate/validators';

const fileName = ref("");
const scheduleFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const isFileUploaded = ref(false);

const props = defineProps({
    show: Boolean,
});

const fileInputClick = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};
function handleFileChange(event: Event){
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if(file){
        scheduleFile.value = file;
        fileName.value = file.name;
        isFileUploaded.value = true
    }else{
        isFileUploaded.value = false
    }
}

const handleDeleteIcon = () => {
    scheduleFile.value = null;
    fileName.value = ""
    isFileUploaded.value = false
}

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
.header__block{
    text-align: center;
    @include Comic(26px, 700);

}
.popup {
    position: absolute;
    z-index: 100;
    width: 1110px;
    height: 2200px;
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
    &__head{
        @include Comic(20px, 400);
        color: rgba(5, 17, 37, 1);
    }
    &__text{
        @include Comic(16px, 400);
        color: rgba(5, 17, 37, 1);
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
        gap: 12px;

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
        flex-direction: column;
        
        &--save {
            @include Comic(24px, 400);
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
        &--filling{
            @include Comic(20px, 400);
            width: 100%;
            padding: 20px 30px;
            background-color: rgba(187, 181, 173, 1);
            color: rgba(255, 255, 255, 1);
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.7s ease;

            &:hover{
                background-color: rgb(122, 122, 122);
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
        &--down{
            @include Comic(24px, 400);
            width: 100%;
            padding: 20px 30px;
            background-color: rgba(255, 207, 182, 1);
            color: rgba(0, 0, 0, 1);
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.7s ease;

            &:hover{
                background-color: rgba(241, 95, 108, 1);
                color: rgb(255, 255, 255);
            }
        }
    }
}
.input-section {
  position: relative;

  &__input {
    @include Comic(16px, 400);
    outline: none;
    appearance: none;


    width: 100%;
    border: none;
    background-color: #FFFFFF;
    border-radius: 10px;
    padding: 20px 15px;
    transition: border-color 0.3s;
    padding-right: 50px;
    border: 2px solid #BBB5AD;

    &--filled {
      border-color: rgba(0, 183, 131, 1);
    }
  }

  &__button {
    @include Comic(20px, 400);
    font-family: Comic;
    width: 915px;
    height: 240px;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid rgba(187, 181, 173, 1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;

    &:hover {
      background-color: rgba(136, 136, 136, 0.2);
      transition: 0.7s;
      
    }

    &:active {
      background-color: rgba(218, 218, 218, 0.4)
    }
  }
}
.input-container {
    position: relative;
    width: 100%;

    .icon-upload {
        position: absolute; 
        right:15px; 
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }

    .input-section__input {
        padding-left: 40px;
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
