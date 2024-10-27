<script setup lang="ts">
 definePageMeta({
    layout: 'admin',
});
</script>

<template>
<section class="container">
    <div class="result-section">
    <h2>
        Списание ингредиентов и украшений
    </h2>
      <table>
        <thead>
          <tr class="container__head">
            <td>Артукул</td>
            <td>Наименование</td>
            <td>Кол-во</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>45924</td>
            <td>Яйцо второй категории  (45-55 гр.)</td>
            <td>2</td>
          </tr>
          <tr>
            <td>435695</td>
            <td>Паста-пюре фрукт.КОНФРУТТИ НАТУР садов.ягоды </td>
            <td>3</td>
          </tr>
          <tr>
            <td>00544</td>
            <td>Свеча-цифра 23046-0</td>
            <td>5</td>
          </tr>
        </tbody>
      </table>
    </div>
</section>
</template>
  
<style scoped lang="scss">
@use '@/assets/scss/_fonts' as *;

.container {
  display: flex;
  justify-content: center;
}

.result-section {
    padding: 20px;
    width: 80%;
    max-width: 60%;
    padding-top: 80px;
  h2 {
    @include adventor-font(36px, 700);
    margin-bottom: 20px;
  }

  table {
    @include verdana-font(16px, 400);
    width: 100%;
    background-color: #f9f9f9;
    border-collapse: collapse;
    overflow: hidden;
    box-shadow: 0px 9px 18.2px 0px rgba(0, 0, 0, 0.1098039216);
    margin-top: 50px;
    
    th, td {
      padding: 12px;
      text-align: left;
      vertical-align: middle;
    }
    tr {
        border: 2px solid rgba(254, 238, 219, 1);
    }
.container__head {
    border-radius: 10px;
    background-color: rgba(254, 238, 219, 1);
}

    .regular {
      background-color: rgba(255, 255, 255, 1);
    }

    .admin {
      background-color: rgba(35, 156, 151, 0.5);
    }

    .highlight {
      background-color: rgba(230, 39, 52, 1);
      color: #fff;
    }
  }

  td:first-child {
    text-align: center;
    width: 250px;
  }
}

.result-btn{
    width: 280px;
    height: 64px;
    background-color: rgb(255, 139, 22);
    color: #fff;
    font-size: 16px;
    font-weight: 400;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
.result-btn:hover{
    background-color: rgba(254, 216, 127, 1);
    color: rgba(0, 0, 0, 1);
    transition: 0.7s;
}

input[type='checkbox'] {
  cursor: pointer;
}

.checkbox-rect {
  display: inline-block;
  position: relative;
}

.checkbox-rect input[type="checkbox"] {
  display: none;
}

.checkbox-rect input[type="checkbox"]+label {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 0;
  cursor: pointer;
  height: 14px;
  padding: 6px;
}

.checkbox-rect input[type="checkbox"]:hover+label:hover {
  color: rgb(23, 86, 228);
}

.checkbox-rect input[type="checkbox"]:hover+label:before {
  background: #196aa6;
  box-shadow: inset 0px 0px 0px 2px #f7f2f2;
}

.checkbox-rect input[type="checkbox"]+label:before {
  content: "";
  display: block;
  width: 14px;
  height: 14px;
  border: 1px solid #343a3f;
  border-radius: 0.2em;
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.2s, background 0.2s ease-in-out;
  background: #f3f3f3;
}

.checkbox-rect input[type="checkbox"]:checked+label:before {
  width: 14px;
  height: 14px;
  border-radius: 0.2em;
  border: 1px solid #fff;
  transform: rotate(90deg);
  background: #196aa6;
  box-shadow: 0 0 0 1px #000;
}
</style>
  