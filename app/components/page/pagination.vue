<script lang="ts" setup>
const props = defineProps<{ name: string }>()

const pagination = computed(() => {
  const cookie = usePaginationMemory(props.name)
  return cookie.value
})

const search = computed(() => {
  const cookie = useSearchMemory(props.name)
  return cookie.value
})

const max = computed(() => Math.floor(pagination.value.total / pagination.value.limit))
const pages = [{ to: 'item', label: 'Items' }, { to: 'table', label: 'Tables' }]
</script>

<template>
  <section class="grid grid-cols-[repeat(3,_1fr)] bg-neutral-900 p-4 outline outline-neutral-800">
    <div>
      <input
        v-model="search.text"
        type="text"
        spellcheck="false"
        autocomplete="false"
        class="border border-neutral-800 size-full p-2 text-center rounded-md transition-colors outline outline-transparent hover:outline-neutral-800"
      >
    </div>

    <div class="flex items-center justify-center gap-2">
      <button
        :disabled="pagination.offset === 0"
        type="button"
        class="text-nowrap flex items-center gap-2 uppercase text-sm outline outline-transparent px-2 py-1 transition-all"
        :class="{
          'text-neutral-800': pagination.offset === 0,
          'cursor-not-allowed': pagination.offset === 0,
          'hover:outline-neutral-800': pagination.offset > 0,
          'cursor-pointer': pagination.offset > 0,
        }"
        @click="pagination.offset--"
      >
        <Icon name="material-symbols:keyboard-arrow-left" />
        <span>prev</span>
      </button>

      <div>
        {{ 1 + pagination.offset }} / {{ 1 + max }}
      </div>

      <button
        :disabled="pagination.offset === max"
        type="button"
        class="text-nowrap flex items-center gap-2 uppercase text-sm outline outline-transparent px-2 py-1 transition-all"
        :class="{
          'text-neutral-800': pagination.offset === max,
          'cursor-not-allowed': pagination.offset === max,
          'hover:outline-neutral-800': pagination.offset < max,
          'cursor-pointer': pagination.offset < max,
        }"
        @click="pagination.offset++"
      >
        <span>next</span>
        <Icon name="material-symbols:keyboard-arrow-right" />
      </button>
    </div>

    <div class="flex justify-end">
      <section class="p-2 space-x-2 uppercase text-sm">
        <NuxtLink
          v-for="{ to, label } in pages"
          :key="to"
          :to="to"
          class="[&.router-link-active]:hover:cursor-not-allowed [&.router-link-active]:text-neutral-900 [&.router-link-active]:bg-neutral-300 text-neutral-300 uppercase text-sm outline outline-transparent not-[&.router-link-active]:hover:outline-neutral-800 px-2 py-1 transition-colors"
        >
          {{ label }}
        </NuxtLink>
      </section>
    </div>
  </section>
</template>
