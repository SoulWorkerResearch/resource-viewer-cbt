import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@vueuse/nuxt',
  ],

  ssr: false,

  imports: {
    presets: [{
      from: '@faker-js/faker',
      imports: ['fakerJA', 'fakerEN', 'faker'],
    }],
  },

  devtools: { enabled: false },

  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-11-01',

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  googleFonts: {
    families: {
      'Noto+Sans+JP': true,
    },
  },
})
