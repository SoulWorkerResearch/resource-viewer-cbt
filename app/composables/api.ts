// Use Nuxt's built-in $fetch for internal API routes
export const useApiFetch = $fetch.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  onRequest: ({ options }) => {
    options.headers.set('Accept', 'application/json')
    options.headers.set('Content-Type', 'application/json')
    options.headers.set('Cache-Control', 'no-cache')

    // TODO: won't work
    // config.request += '.json'
  },
})
