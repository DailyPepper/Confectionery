<template>
  <div class="container">
    <div class="welcome">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '@/assets/scss/_fonts' as *;

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.welcome {
  width: 1200px;
  margin: 40px auto;
  border-radius: 20px;
  padding: 30px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #948F89;
}
</style>
