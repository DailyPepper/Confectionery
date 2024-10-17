
<template>
  <div class="fixed" >
    <div class="popup">
      <SvgoClose class="popup__close" />
      <h2 class="popup__title">Booking confirmation</h2>
    </div>
  </div>
</template>
<script lang="ts" setup>
</script>


<style lang="scss" scoped>
@use '@/assets/scss/fonts' as *;

.popup__input {
  max-width: 283px;
}

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

.popup {
  position: absolute;
  z-index: 100;
  width: 1110px;
  height: 1250px;
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
}
</style>
