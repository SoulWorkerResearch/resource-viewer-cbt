export type TableListEntry = { name: string, file: string }

export const useTableList = defineStore('table-list', () => {
  const response = useAsyncData('table-list', () => useApiFetch<TableListEntry[]>('tables.json'), { default: () => [] as TableListEntry[] })

  watch(() => response.data, (data) => {
    data.value = data.value.toSorted((a, b) => a.name.localeCompare(b.name))
  })

  return response
})
