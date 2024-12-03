import { defineStore } from "pinia";
import type { Order } from "~/types";

export const useOrderStore = defineStore("order", () => {
  const orders = ref<Order[]>([]);
  const isLoading = ref(false);

  const initializeOrders = async () => {
    try {
      isLoading.value = true;
      const response = await $fetch<Order[]>("http://176.124.213.100:8080/orders", {
        method: "GET",
        credentials: "include",
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

  const createOrder = async (orderData: {
    name: string;
    description: string;
    height: number;
    width: number;
    unit: string;
    clientID: string | null;
    file: File | null;
  }) => {
    try {
      const formData = new FormData();
      formData.append(
        "order",
        JSON.stringify({
          name: orderData.name,
          description: orderData.description,
          height: orderData.height,
          width: orderData.width,
          unit: orderData.unit,
          clientID: orderData.clientID,
        })
      );
      if (orderData.file) {
        formData.append("file-n", orderData.file);
      }

      const response = await $fetch<Order>("http://176.124.213.100:8080/orders", {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-type": "application/json",
        },
        body: formData,
      });

      if (response) {
        console.log("Order created successfully:", response);
        orders.value.push(response); 
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      const response = await $fetch(`http://176.124.213.100:8080/orders/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response) {
        console.log("Order deleted successfully:", id);
        orders.value = orders.value.filter((order) => order.id !== id); 
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return {
    orders,
    isLoading,
    initializeOrders,
    createOrder,
    deleteOrder,
  };
});
