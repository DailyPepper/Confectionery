<template>
  <label class="input-with-label" :style="{ width: labelWidth, height: labelHeight }">
    <span class="input-with-label__label">
      <slot name="label" />
    </span>
    <div class="input-with-label__input-wrapper">
      <input
        v-bind="$attrs"
        v-model="inputValue"
        :type="computedInputType"
        :class="[
          'input-with-label__input',
          {
            'input-with-label__input--valid': isValid,
            'input-with-label__input--invalid': isInvalid,
          },
        ]"
        @input="updateValue"
        :style="{ height: inputHeight }"
      />

      <button
        v-if="type === 'password'"
        type="button"
        tabindex="0"
        class="input-with-label__toggle-password"
        @click="toggleShowPassword"
      >
        <SvgoEye
          class="input-with-label__eye-icon"
          v-if="showPassword"
          src="@/assets/icons/eye.svg"
          alt="Eye open icon"
        />
        <SvgoEyeClose
          class="input-with-label__eye-icon"
          v-else
          src="@/assets/icons/eye-close.svg"
          alt="Eye close icon"
        />
      </button>
    </div>
  </label>
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
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: String,
    default: '',
  },
  isValid: {
    type: Boolean,
    default: true,
  },
  isInvalid: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref(props.modelValue);
const showPassword = ref(false);

const computedInputType = computed(() => {
  return props.type === 'password' && showPassword.value ? 'text' : props.type;
});

function updateValue(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  inputValue.value = value;
  emit('update:modelValue', value);
}

function toggleShowPassword() {
  showPassword.value = !showPassword.value;
}

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
    @include Comic(20px, 400);
    
    width: 100%;
    border: none;
    background-color: #FFFFFF;
    border-radius: 20px;
    padding: 30px 40px;
    transition: border-color 0.3s;
    padding-right: 50px;
    border: 2px solid #BBB5AD;
  }

  &__toggle-password {
    width: 24px;
    position: absolute;
    top: 50%;
    right: 40px;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    display: flex;
  }

  &__eye-icon {
    width: 100%;
    height: 100%;
  }
}
</style>
