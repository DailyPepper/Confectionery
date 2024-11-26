import type { Toppings, ToppingsTypes } from "~/types";

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

  return {
    fetchToopings,
    toppings,
    fetchTypes,
    toppingsType
  };
});
