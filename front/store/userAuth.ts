import { defineStore } from "pinia";
import type { User } from "~/types";

export const useAuthStore = defineStore("user", () => {
  const isAuth = ref(false);
  const user = ref<User | null>(null);

  const initialize = () => {
    if (typeof window !== "undefined" && localStorage) {
      const storedUser = localStorage.getItem("user");
      const storedAuth = localStorage.getItem("isAuth");

      if (storedUser && storedAuth) {
        user.value = JSON.parse(storedUser);
        isAuth.value = JSON.parse(storedAuth) === true;
      }
    }
  };

  const fetchLogin = async (userData: {
    username: string;
    password: string;
  }) => {
    if (isAuth.value) {
      console.error("Пользователь уже вошел в систему");
      return;
    }

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

        if (typeof window !== "undefined" && localStorage) {
          localStorage.setItem("user", JSON.stringify(user.value));
          localStorage.setItem("isAuth", JSON.stringify(isAuth.value));
        }

        console.log("Успешный вход!", user.value);
      }
    } catch (error) {
      console.log("Ошибка входа: ", error);
    }
  };

  const handleLogout = () => {
    isAuth.value = false;
    user.value = null;

    if (typeof window !== "undefined" && localStorage) {
      localStorage.removeItem("user");
      localStorage.removeItem("isAuth");
    }
  };

  const fetchRegistration = async (userRegister: {
    username: string;
    fullName: string;
    password: string;
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

      if (response)
        console.log("Пользователь успешно зарегестрирован", userRegister);
    } catch (error) {
      console.log("Ошибка при регистрации: ", error);
    }
  };

  return {
    fetchLogin,
    fetchRegistration,
    isAuth,
    user,
    initialize,
    handleLogout,
  };
});
