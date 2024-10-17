  <script lang="ts" setup>
  import { computed, defineProps, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const isMenuOpen = ref({
    flights: false,
    reports: false,
  });
  const props = defineProps<{
    isHiding: boolean;
  }>();

  const toggleMenu = (menuKey: keyof typeof isMenuOpen.value) => {
    isMenuOpen.value[menuKey] = !isMenuOpen.value[menuKey];
  };

  const currentRoute = computed(() => router.currentRoute.value.path);

  const handleClick  = () => {
    if (props.isHiding) {
      isMenuOpen.value.flights = false;
      isMenuOpen.value.reports = false;
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
    <ul>
      <li class="section__user--list" :class="{ closed: isHiding}">
        <NuxtLink to="/admin" class="section__user--link" :class="{ active: currentRoute === '/admin' }">
          <div>
            <SvgoUserdef alt="user" class="section__user--icon" />
            <span v-if="!props.isHiding" class="section__user--text" :class="{ active: currentRoute === '/admin' }">
              Users
            </span>
          </div>
        </NuxtLink>
      </li>
      <li class="section__user--list" :class="{ closed: isHiding}">
        <div class="section__user--link" @click="toggleMenu('flights')">
          <div>
            <SvgoAirplane alt="airplane" class="section__user--icon" />
            <span v-if="!props.isHiding" class="section__user--text" :class="{ active: currentRoute === '/flights' }">
              Flight
            </span>
          </div>
          <div v-if="!props.isHiding">
            <SvgoArrow-right v-if="!isMenuOpen.flights" class="section__user--arrow" />
            <SvgoArrow-bottom v-else class="section__user--close" />
          </div>
        </div>
        <ul v-if="isMenuOpen.flights" class="section__sub-menu">
          <li class="section__sub-menu-item">
            <NuxtLink to="/manage_schedules" class="section__sub-menu-link">
              Manage Schedules
            </NuxtLink>
          </li>
          <li class="section__sub-menu-item">
            <NuxtLink to="/search" class="section__sub-menu-link">
              Search for Flight
            </NuxtLink>
          </li>
          <li class="section__sub-menu-item">
            <NuxtLink to="/booking" class="section__sub-menu-link">
              Booking
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li class="section__user--list" :class="{ closed: isHiding}">
        <div class="section__user--link" @click="toggleMenu('reports')">
          <div>
            <SvgoDocument alt="document" class="section__user--icon" />
            <span v-if="!props.isHiding" class="section__user--text" :class="{ active: currentRoute === '/flight-reports' }">
              Flight Reports
            </span>
          </div>
          <div v-if="!props.isHiding">
            <SvgoArrow-right v-if="!isMenuOpen.reports" class="section__user--arrow section__user--arrow--second" />
            <SvgoArrow-bottom v-else class="section__user--close section__user--close--second" />
          </div>
        </div>
        <ul v-if="isMenuOpen.reports" class="section__sub-menu">
          <li class="section__sub-menu-item">
            <NuxtLink to="/flight_reports" class="section__sub-menu-link">
              Summary Reports
            </NuxtLink>
          </li>
          <li class="section__sub-menu-item">
            <NuxtLink to="/flight_reports/details_reports" class="section__sub-menu-link">
              Details Reports
            </NuxtLink>
          </li>
          <li class="section__sub-menu-item">
            <NuxtLink to="/amenities-reports" class="section__sub-menu-link">
              Amenities reports
            </NuxtLink>
          </li>
          <li class="section__sub-menu-item">
            <NuxtLink to="/airlines-reports" class="section__sub-menu-link">
              Airlines reports
            </NuxtLink>
          </li>
        </ul>
      </li>
      <li class="section__user--list" :class="{ closed: isHiding}">
        <NuxtLink to="/flight-reports" class="section__user--link" :class="{ active: currentRoute === '/flight-reports' }">
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
      width: 230px; // Ширина при открытом меню
      &.closed {
        width: 100%; // Ширина при закрытом меню
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
