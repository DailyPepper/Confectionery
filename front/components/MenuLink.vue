<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/store/userAuth';

const router = useRouter();
const isMenuOpen = ref({
  order: false,
  accounting: false,
});
const props = defineProps<{
  isHiding: boolean;
}>();

const toggleMenu = (menuKey: keyof typeof isMenuOpen.value) => {
  isMenuOpen.value[menuKey] = !isMenuOpen.value[menuKey];
};

const useAuth = useAuthStore()

const currentRoute = computed(() => router.currentRoute.value.path);

const handleClick = () => {
  if (props.isHiding) {
    isMenuOpen.value.order = false;
    isMenuOpen.value.accounting = false;
  }
};
onMounted(() => {
  document.addEventListener('click', handleClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick);
});
</script>

<template>
  <nav class="section__user">
    <ul v-if="useAuth.user?.role">
      <li v-if="useAuth.user.role !== 'Заказчик'" class="section__user--list" :class="{ closed: isHiding }">
        <div class="section__user--link" @click="toggleMenu('accounting')">
          <div>
            <SvgoWorkshop alt="workshop" class="section__user--icon" />
            <span v-if="!props.isHiding" class="section__user--text" :class="{ active: currentRoute === '/' }">
              Учет
            </span>
          </div>

          <div v-if="!props.isHiding">
            <SvgoArrowRight v-if="!isMenuOpen.accounting" class="section__user--arrow section__user--arrow--second" />
            <SvgoArrowBottom v-else class="section__user--close section__user--close--second" />
          </div>
        </div>

        <ul v-if="isMenuOpen.accounting" class="section__sub-menu">
          <li v-if="useAuth.user.role === 'Директор'" class="section__sub-menu-item">
            <NuxtLink to="/" class="section__sub-menu-link">
              Инструменты
            </NuxtLink>
          </li>
          <li v-if="useAuth.user.role === 'Директор'" class="section__sub-menu-item">
            <NuxtLink to="/purchase-tool" class="section__sub-menu-link">
              Закупка инструмента
            </NuxtLink>
          </li>
          <li class="section__sub-menu-item">
            <NuxtLink to="/accounting/ingredients_decorations" class="section__sub-menu-link">
              Ингредиенты и украшения
            </NuxtLink>
          </li>
        </ul>
      </li>

      <li v-if="useAuth.user.role !== 'Заказчик'" class="section__user--list" :class="{ closed: isHiding }">
        <NuxtLink to="/workshop" class="section__user--link" :class="{ active: currentRoute === '/' }">
          <div>
            <SvgoAccounting alt="accounting" class="section__user--icon" />
            <span v-if="!props.isHiding" class="section__user--text" :class="{ active: currentRoute === '/' }">
              План цеха
            </span>
          </div>
        </NuxtLink>
      </li>

      <li class="section__user--list" :class="{ closed: isHiding }">
        <div class="section__user--link" @click="toggleMenu('order')">
          <div>
            <SvgoOrder alt="order" class="section__user--icon" />
            <span v-if="!props.isHiding" class="section__user--text" :class="{ active: currentRoute === '/' }">
              Заказ
            </span>
          </div>
          <div v-if="!props.isHiding">
            <SvgoArrowRight v-if="!isMenuOpen.order" class="section__user--arrow section__user--arrow--second" />
            <SvgoArrowBottom v-else class="section__user--close section__user--close--second" />
          </div>
        </div>
        <ul v-if="isMenuOpen.order" class="section__sub-menu">
          <li class="section__sub-menu-item">
            <NuxtLink to="/list-orders" class="section__sub-menu-link">
              Список заказов
            </NuxtLink>
          </li>
          <li v-if="useAuth.user.role === 'Директор'" class="section__sub-menu-item">
            <NuxtLink to="/costEstimation" class="section__sub-menu-link">
              Оценка затрат
            </NuxtLink>
          </li>
          <li v-if="useAuth.user.role === 'Директор' || useAuth.user.role === 'Менеджер по работе с клиентами'" class="section__sub-menu-item">
            <NuxtLink to="/" class="section__sub-menu-link">
              Смена статуса
            </NuxtLink>
          </li>
          <li v-if="useAuth.user.role === 'Менеджер по работе с клиентами' || useAuth.user.role === 'Менеджер по закупкам' || useAuth.user.role === 'Директор'" class="section__sub-menu-item">
            <NuxtLink to="/remains" class="section__sub-menu-link">
              Остатки
            </NuxtLink>
          </li>
          <li v-if="useAuth.user.role === 'Мастер' || useAuth.user.role === 'Директор'" class="section__sub-menu-item">
            <NuxtLink to="/equipmentFailures/equipmentFailures" class="section__sub-menu-link">
              Сбои оборудования
            </NuxtLink>
          </li>
          <li v-if="useAuth.user.role === 'Мастер' || useAuth.user.role === 'Директор' || useAuth.user.role === 'Менеджер по закупкам'" class="section__sub-menu-item">
            <NuxtLink to="/writeOff/writeOff" class="section__sub-menu-link">
              Списание
            </NuxtLink>
          </li>
          <li v-if="useAuth.user.role !== 'Менеджер по работе с клиентами' && useAuth.user.role !== 'Менеджер по закупкам'" class="section__sub-menu-item">
            <NuxtLink to="/qualityСontrol/qualityСontrol" class="section__sub-menu-link">
              Контроль качества
            </NuxtLink>
          </li>
          <li v-if="useAuth.user.role === 'Директор'" class="section__sub-menu-item">
            <NuxtLink to="/productSpecifications/productSpecifications" class="section__sub-menu-link">
              Спецификации изделий
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li class="section__user--list" :class="{ closed: isHiding }">
        <NuxtLink to="/" class="section__user--link" :class="{ active: currentRoute === '/' }">
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@use '@/assets/scss/_fonts' as *;

.section {
  z-index: 1000;

  &__user {
    &--icon {
      width: 20px;
      height: 20px;
    }

    &--list {
      width: 230px;
      padding: 5px 0;

      &.closed {
        width: 100%;
      }
    }

    &--link {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 15px;
      font-size: 15px;
      cursor: pointer;
      justify-content: space-between;
    }

    &--arrow {
      position: relative;

    }

    &--close {
      position: relative;

    }

    &--sum-arrow {
      position: relative;
      left: 40px;
    }

    &--sum-close {
      position: relative;
      left: 62px;
    }

    &--text {
      color: #fdfeff;
    }
  }

  &__sub-menu {
    list-style: none;
    margin-left: 30px;
    width: 181px;

    &-item {
      padding: 8px 0;
      margin: 0 15px;
    }

    &-link {
      color: #fdfeff;
      text-decoration: none;
      font-size: 14px;
      display: block;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
