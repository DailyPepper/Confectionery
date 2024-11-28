import type { Supplier, Toppings, ToppingsTypes } from "~/types";

export const useToppingsStore = defineStore("toppings", () => {
  const toppings = ref<Toppings[]>([]);
  const toppingsType = ref<ToppingsTypes[]>([]);

  const fetchToopings = async () => {
    try {
      const response = await $fetch<Toppings[]>(
        "http://176.124.213.100:8080/toppings",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response) toppings.value = response;
    } catch (error) {
      console.log("Ошибка получения топпингов: ", error);
    }
  };

  const fetchTypes = async () => {
    try {
      const response = await $fetch<ToppingsTypes[]>(
        "http://176.124.213.100:8080/toppings/types",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response) toppingsType.value = response;
    } catch (error) {
      console.log("Ошибка получения типов: ", error);
    }
  };

  const editToppings = async (
    toppingData: {
      article: string;
      name: string;
      quantity: number;
      unit: number;
      purchasePrice: number;
      type: ToppingsTypes;
      supplier: Supplier;
      deliveryDuration: string;
      shelfLife: string;
    },
    idTopping: number
  ) => {
    try {
      await $fetch<Toppings>(
        `http://176.124.213.100:8080/toppings/${idTopping}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(toppingData),
        }
      );

      fetchToopings();
    } catch (error) {
      console.log("Ошибка отправки данных: ", error);
    }
  };

  const deleteToppings = async (idTopping: number) => {
    try {
      const response = await $fetch<Toppings>(
        `http://176.124.213.100:8080/toppings/${idTopping}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response) {
        console.log("Топпинг успешно удален:", response);
        fetchToopings();
      }
    } catch (error) {
      console.log("Ошибка отправки данных: ", error);
    }
  };

  return {
    fetchToopings,
    toppings,
    fetchTypes,
    toppingsType,
    editToppings,
    deleteToppings
  };
});
