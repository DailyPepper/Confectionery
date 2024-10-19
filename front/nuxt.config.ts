// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  app: {
    head: {
      title: "Confectionery",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "nuxt-svgo"],
  svgo: {
    autoImportPath: "~/assets/icons/",
  },
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3000",
    },
  },
});
