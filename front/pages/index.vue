<template>
  <div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/userAuth';

definePageMeta({
  middleware: 'redirect',
})

onMounted(() => {
  const authStore = useAuthStore();
  authStore.initialize();
});
</script>

<style scoped lang="scss"></style>
