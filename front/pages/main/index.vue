<template>
  <div class="container">
    <StyleBlock>
      <h1 class="welcome__title">Hi,, welcome to confectionery
        Airlines</h1>
      <div class="welcome__info">
        <p class="welcome__info-time">Time 9:41</p>
      </div>
    </StyleBlock>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/_fonts' as *;

.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.welcome {
  &__title {
    @include adventor-font(36px, 700);

    color: #051125;
  }

  &__info {
    @include verdana-font(16px, 400);

    display: flex;
    justify-content: flex-start;
    color: #6b6b6b;
    gap: 60px;

    &-time,
    &-crashes {
      @include verdana-font(16px, 400);

      margin: 0;
    }
  }
}

.log-table {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 1000px;

  &__text {
    @include adventor-font(36px, 700);
  }

  &__table {
    margin-top: 30px;
    width: 100%;
    background-color: #f9f9f9;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 9px 18.2px 0px #0000001c;
  }

  &__header {
    background-color: #D7E0F980;


  }

  &__header-cell {
    @include verdana-font(16px, 400);

    padding: 12px;
    text-align: left;
  }

  &__cell {
    @include verdana-font(16px, 400);

    padding: 12px;
    text-align: left;
    vertical-align: middle;
    border-bottom: 1px solid #ddd;
  }

  &__row--error {
    background-color: rgba(230, 39, 52, 1);
    color: white;
  }
}
</style>
