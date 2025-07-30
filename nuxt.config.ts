// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@paper-ui/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-telegram-auth',
    '@nuxt/fonts',
  ],
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    TELEGRAM_TOKEN: '8062632576:AAGK1VdtHYaPfb39JU53O4b4MiaGPy7YZ4g',
  },
});
