import { navigateTo } from "#app";
import { useAuthStore } from "~/store/userAuth";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  if (authStore.isAuth) {
    return navigateTo("/admin");
  }

  if (!authStore.isAuth && to.path !== "/login") {
    return navigateTo("/login");
  }
});
