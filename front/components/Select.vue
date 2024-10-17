<template>
  <section class="input-with-label" :style="{ width: labelWidth, height: labelHeight }">
    <label class="input-with-label__label" for="select-field">
      <slot name="label" />
    </label>
    <div class="input-with-label__input-wrapper">
      <select
        v-bind="$attrs"
        v-model="selectedValue"
        class="input-with-label__input"
        id="select-field"
        :style="{ height: inputHeight }"
      >
        <option value="" disabled selected>Choose a country</option>
        <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
      </select>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  labelWidth: {
    type: String,
    default: '100%',
  },
  labelHeight: {
    type: String,
    default: 'auto',
  },
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);
const selectedValue = ref(props.modelValue);

const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany']; 

watch(selectedValue, (newValue) => {
  emit('update:modelValue', newValue);
});

const inputHeight = computed(() => {
  return props.labelHeight;
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/fonts' as *;

.input-with-label {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  max-width: 100%;

  &__label {
    margin-bottom: 8px;
  }

  &__input-wrapper {
    position: relative;
    width: 100%;
  }

  &__input {
    @include verdana-font(20px, 400);
    
    width: 100%;
    border: none;
    background-color: #f7f8fa;
    border-radius: 20px;
    padding: 30px 40px;
    transition: border-color 0.3s;
    border: 2px solid #f7f8fa;


    &:hover {
      background-color: #c1d9fd;
      border: 2px solid #f7f8fa;
    }

    &:active {
      border: 2px solid #196aa6;
    }

    &:focus {
      border-color: #196aa6;
      outline: none;
    }
  }
}
</style>
