<template>
  <div v-if="isVisible" class="modal" @click.self="closeModal">
    <div class="modal__content">
      <SvgoClose class="modal__close-icon" @click="closeModal" />
      <h2 class="modal__heading">Apply Schedule Changes</h2>
      <form class="modal__form" @submit.prevent="submitForm">
        <div class="modal__input-group">
          <section class="input-section">
            <div class="input-section__wrapper">
              <input
                type="text"
                class="input-section__input"
                :value="fileName"
                readonly
              />
              <input
                type="file"
                id="schedule-file"
                accept=".csv"
                ref="fileInput"
                @change="handleFileChange"
                style="display: none;"
              />
              <button 
                type="button"
                class="input-section__button"
                @click="fileInputClick"
              >
                <SvgoImport class="action-buttons__icon" alt="Add user" filled />
                Import
              </button>
            </div>
          </section>
        </div>
        <section class="route-info">
          <p class="route-info__header">Results</p>
          <div class="route-info__details">
            <p class="route-info__text">
              Successful Changes Applied: 
              <span class="route-info__highlight">
                {{ successfulChanges ? successfulChanges : 0 }}
              </span>
            </p>
            <p class="route-info__text">
              Duplicate Records Discarded: 
              <span class="route-info__highlight">
                {{ duplicateRecords ? duplicateRecords : 0 }}
              </span>
            </p>
            <p class="route-info__text">
              Records with Missing Fields Discarded: 
              <span class="route-info__highlight">
                {{ failedRecords }}
              </span>
            </p>
          </div>
        </section>
        <section class="modal__actions">
          <button type="submit" class="modal__actions-save">Update</button>
          <button type="button" class="modal__actions-cancel" @click="cancelModal">
            Cancel
          </button>
        </section>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';

const scheduleFile = ref<File | null>(null);
const fileName = ref("");
const fileInput = ref<HTMLInputElement | null>(null);
const successfulChanges = ref("[xxx]");
const duplicateRecords = ref("[xxx]");
const failedRecords = ref("[xxx]");

const fileInputClick = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

defineProps({
  isVisible: Boolean,
});

const emit = defineEmits(["update:isVisible"]);

const submitForm = async () => {
  if (!scheduleFile.value) {
    alert("Пожалуйста, выберите файл.");
    return;
  }

  const formData = new FormData();
  formData.append("file", scheduleFile.value);

  try {
    const response = await axios.post('http://localhost:8080/schedules/import-csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true, 
    });

    successfulChanges.value = response.data.accepted ? response.data.accepted : "[xxx]";
    duplicateRecords.value = response.data.duplicated ? response.data.duplicated : "[xxx]";
    // @ts-ignore
    failedRecords.value = 0;

  } catch (error) {
    console.error('Ошибка при загрузке файла:', error);
    alert('Произошла ошибка при загрузке файла.');
  }
};

const closeModal = () => {
  emit("update:isVisible", false);
};

const cancelModal = () => {
  scheduleFile.value = null;
  fileName.value = "";
  successfulChanges.value = "[xxx]";
  duplicateRecords.value = "[xxx]";
  failedRecords.value = "[xxx]"; 
  closeModal();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    scheduleFile.value = file;
    fileName.value = file.name;
  }
};
</script>


<style lang="scss">
@use '@/assets/scss/_fonts' as *;

.modal {
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

  &__content {
    position: absolute;
    z-index: 100;
    width: 1100px;
    height: 640px;
    margin: 220px auto;
    padding: 80px 100px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__close-icon {
    position: absolute;
    width: 12px;
    height: 12px;
    top: 48px;
    right: 48px;
    cursor: pointer;
  }

  &__heading {
    @include Comic(36px, 700);

    color: rgba(5, 17, 37, 1);
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  &__input-group {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    gap: 10px;

    &-save {
      @include Comic(20px, 400);

      width: 100%;
      padding: 20px 30px;
      background-color: #0066cc;
      color: #fdfeff;
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

    &-cancel {
      @include Comic(20px, 400);

      width: 100%;
      padding: 20px 30px;
      color: #e62734;
      border: 2px solid #e62734;
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

.input-section {
  position: relative;

  &__label {
    @include Comic(20px, 400);

    margin-bottom: 10px;
  }

  &__wrapper {
    display: flex;
    position: relative;
    width: 900px;
  }

  &__input {
    @include Comic(16px, 400);

    color: #051125;
    background-color: #F7F8FA;
    width: 590px;
    height: 64px;
    border: none;
    border-radius: 15px;
    padding: 20px;
    outline: none;
    appearance: none;
    margin-top: 20px;
  }

  &__button {
    @include Comic(16px, 400);

    position: absolute;
    bottom: 0;
    right: 0;
    width: 300px;
    height: 64px;
    padding: 20px;
    background-color: #0066cc;
    color: #fff;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    &:hover {
      background-color: #005bb5;
    }

    &:active {
      background-color: #004a99;
    }
  }
}

.route-info {
  &__header {
    @include Comic(20px, 400);

    margin-bottom: 20px;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__text {
    @include Comic(16px, 400);

    color: #051125;
    width: 500px;
    position: relative;
  }

  &__highlight {
    @include Comic(16px, 400);

    position: absolute;
    right: 0;
  }
}

.action-buttons__icon {
  width: 24px;
  height: 24px;
}
</style>
