<script lang="ts" setup>
const { tableContent } = storeToRefs(useTableContent())

const pagination = computed(() => {
  const cookie = usePaginationMemory(tableContent.value.file)
  cookie.value.total = tableContent.value.rows.length
  return cookie.value
})

const search = computed(() => {
  const cookie = useSearchMemory(tableContent.value.file)
  return cookie.value
})

const contents = computed(() => {
  return tableContent.value.rows
    .filter(row => row.some(item => String(item).toLowerCase().includes(search.value.text.toLowerCase())))
    .slice(pagination.value.offset * pagination.value.limit, pagination.value.offset * pagination.value.limit + pagination.value.limit)
})
</script>

<template>
  <section class="flex flex-col">
    <section class="grow">
      <section
        class="grid whitespace-nowrap"
        :style="{
          'grid-template-columns': `repeat(${tableContent.header.length}, 1fr)`,
        }"
      >
        <span
          v-for="item, index in tableContent.header"
          :key="`${tableContent.file} - ${index}`"
          class="border-b border-neutral-800 px-2 pb-1 uppercase  sticky top-0 bg-neutral-900"
        >
          <div class="inline-grid grid-cols-[auto_1fr] items-center gap-x-2">
            <Icon name="material-symbols:stacks-rounded" />
            <span class="text-violet-300">{{ item }}</span>

            <Icon name="material-symbols:table-rows-rounded" />
            <span>field {{ 1 + index }}</span>
          </div>
        </span>

        <template
          v-for="row, rowIndex in contents"
          :key="rowIndex"
        >
          <span
            v-for="item, index in row"
            :key="`${tableContent.file} - ${index}`"
            class="px-8 py-1 border-b border-neutral-800"
            :class="{
              'text-fuchsia-300': typeof item === 'number',
              'text-orange-300': typeof item !== 'number',
            }"
          >
            {{ item }}
          </span>
        </template>
      </section>
    </section>

    <PagePagination
      :name="tableContent.file"
      class="sticky bottom-0 left-0 w-full"
    />
  </section>
</template>
