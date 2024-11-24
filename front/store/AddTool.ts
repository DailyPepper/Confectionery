export const useToolStore = defineStore("tool", () => {
  const addTool = async (toolData: {
    name: string;
    description: string;
    supplierId: number;
    wear: "NEW";
    typeId: number;
    purchaseDate: null;
    quantity: number;
  }) => {
    try {
      await $fetch("http://176.124.213.100:8080/tools", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "applications/json",
        },
        body: JSON.stringify(toolData),
      });
    } catch (error) {
      console.log("Ошибка добавления инструментов: ", error);
    }
  };
  return {
    addTool,
  };
});
