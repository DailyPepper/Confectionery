import type { Supplier, Tool, ToolTypes } from "~/types";

export const useToolStore = defineStore("selects", () => {
  const toolsTypes = ref<ToolTypes[]>([]);
  const suppliers = ref<Supplier[]>([]);
  const tools = ref<Tool[]>([]);

  const fetchTypes = async () => {
    try {
      const response = await $fetch<ToolTypes[]>(
        "http://176.124.213.100:8080/tools/types",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response) toolsTypes.value = response;
    } catch (error) {
      console.log("Ошибка получения типов: ", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await $fetch<Supplier[]>(
        "http://176.124.213.100:8080/suppliers",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response) suppliers.value = response;
    } catch (error) {
      console.log("Ошибка получения поставщиков: ", error);
    }
  };

  const fetchTools = async () => {
    try {
      const response = await $fetch<Tool[]>(
        "http://176.124.213.100:8080/tools",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response) tools.value = response;
    } catch (error) {
      console.log("Ошибка получения типов: ", error);
    }
  };

  return {
    fetchTypes,
    fetchSuppliers,
    fetchTools,
    toolsTypes,
    suppliers,
    tools,
  };
});
