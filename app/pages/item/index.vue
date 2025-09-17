<script lang="ts" setup>
const { tableGetCache } = useTableCache()

const itemScript = tableGetCache('tb_item_script')

const pagination = computed(() => {
  const cookie = usePaginationMemory('items')

  cookie.value.limit = 1000
  cookie.value.total = itemScript.value.rows.length

  return cookie.value
})

const getIconUrl = (url?: string | number) => new URL(`${url}.png`, import.meta.env.VITE_ASSETS_BASE_URL).href
// const getIconUrl = (url?: string | number) => `/${url}.png`

const filter = ref('')
const request = computed(() => filter.value.trim().toLowerCase())

const total = computed(() => itemScript.value.rows.filter(item => String(item[12]).toLowerCase().includes(request.value) || String(item[0]).toLowerCase().includes(request.value)))

const results = computed(() => total.value.slice(pagination.value.offset * pagination.value.limit, pagination.value.offset * pagination.value.limit + pagination.value.limit))

watch(total, (values) => {
  pagination.value.offset = 0
  pagination.value.total = values.length
})
</script>

<template>
  <section class="flex flex-col w-full min-h-dvh">
    <section class="flex items-center justify-center gap-2 bg-neutral-900 p-2 outline outline-neutral-800 top-0 sticky">
      <input
        v-model="filter"
        type="text"
        spellcheck="false"
        autocomplete="false"
        class="border border-neutral-800 size-full p-2 text-center rounded-md transition-colors outline outline-transparent hover:outline-neutral-800"
      >
    </section>

    <section
      class="grid gap-2 p-2 grow place-content-start"
      :style="{ 'grid-template-columns': 'repeat(auto-fill, minmax(48px, 1fr))' }"
    >
      <PageModal
        v-for="result, index in results"
        :key="`${result[0]}-${index}`"
      >
        <template #button="{ toggle }">
          <button
            type="button"
            class="size-fit group cursor-pointer overflow-hidden rounded-md bg-neutral-900 shadow-md outline outline-transparent transition-all hover:bg-neutral-300 hover:outline-neutral-800"
            @click="toggle()"
          >
            <img
              :src="getIconUrl(result[1])"
              :alt="String(result[12])"
              class="size-12 transition-all group-hover:opacity-50"
            >
          </button>
        </template>

        <template #content>
          <div class="flex flex-col gap-2 justify-center w-[75dvw]">
            <div class="flex items-center gap-4">
              <img
                :src="getIconUrl(result[1])"
                :alt="String(result[12])"
                class="size-12 rounded-md shadow-md"
              >
              <div>
                <h1 class="text-2xl font-bold">
                  {{ result[12] }}
                </h1>
                <h2 class="text-sm text-pink-300 italic">
                  {{ result[0] }}
                </h2>
              </div>
            </div>

            <p>
              {{ result[13] }}
            </p>
          </div>
        </template>
      </PageModal>
    </section>

    <PagePagination
      name="items"
      class="sticky bottom-0"
    />
  </section>
</template>
