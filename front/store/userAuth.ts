import { defineStore } from "pinia";
import type { User } from "~/types";

export const useAuthStore = defineStore("user", () => {
  const isAuth = ref(false);
  const user = ref<User | null>(null);

  const fetchLogin = async (userData: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await $fetch<User>(
        "http://176.124.213.100:8080/auth/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response) {
        isAuth.value = true;
        user.value = {
          id: response.id,
          username: response.username,
          role: response.role,
          fullName: response.fullName,
        };
        console.log("Успешный вход!");
      }
    } catch (error) {
      console.log("Ошибка входа: ", error);
    }
  };

  const fetchRegistration = async (userRegister: {
    username: string;
    password: string;
    fullName: string;
  }) => {
    try {
      const response = await $fetch(
        "http://176.124.213.100:8080/auth/register",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(userRegister),
        }
      );

      if (response) console.log("Пользователь успешно зарегестрирован");
    } catch (error) {
      console.log("Ошибка при регистрации: ", error);
    }
  };

  return {
    fetchLogin,
    fetchRegistration,
    isAuth,
    user,
  };
});
