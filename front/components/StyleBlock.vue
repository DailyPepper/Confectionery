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
  width: 1000px;
  margin: 40px auto;
  border-radius: 20px;
  padding: 30px;
  background-color: #fff;
  box-shadow: 0px 9px 18.2px 0px #0000001c;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
