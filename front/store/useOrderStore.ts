import { defineStore } from "pinia";
import { ref } from "vue";
import type { Order } from "~/types"; // Типы для заказов

export const useOrderStore = defineStore("order", () => {
  const orders = ref<Order[]>([]);
  const isLoading = ref(false);

  const initializeOrders = async () => {
    try {
      isLoading.value = true;
      const response = await $fetch<Order[]>("http://176.124.213.100:8080/orders", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response) {
        orders.value = response;
        console.log("Orders loaded:", orders.value);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    orders,
    isLoading,
    initializeOrders,
  };
});
