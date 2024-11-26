import { useAuthStore } from "~/store/userAuth";

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();

  if (!authStore.isAuth) {
    return navigateTo("/login");
  }

  if (authStore.user) {
    const role = authStore.user.role;

    if (role === "Customer" || role === "Заказчик") {
      return navigateTo("/list-orders");
    }

    if (role !== "Director" && role !== "Директор") {
      return navigateTo("/accounting/ingredients_decorations");
    }

    return navigateTo("/admin");
  }

  return navigateTo("/login");
});
