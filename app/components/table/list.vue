<script lang="ts" setup>
const tableList = storeToRefs(useTableList())
const { tableContent } = storeToRefs(useTableContent())
const { tablePick } = useTableContent()
</script>

<template>
  <section>
    <ul class="space-y-2">
      <li
        v-for="{ file, name }, index in tableList.data.value"
        :key="file"
      >
        <button
          type="button"
          class="text-nowrap flex items-center gap-2 uppercase text-sm  w-full outline outline-transparent hover:outline-neutral-800 px-2 py-1 transition-colors"
          :class="{
            'bg-neutral-300': tableContent.name === name,
            'text-neutral-900': tableContent.name === name,
            'cursor-not-allowed': tableContent.name === name,
            'cursor-pointer': tableContent.name !== name,
          }"
          @click="tablePick(index)"
        >
          <Icon name="material-symbols:database" />
          <span>{{ name }}</span>
        </button>
      </li>
    </ul>
  </section>
</template>
