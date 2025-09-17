export const useTableContent = defineStore('table-content', () => {
  const listEntry = ref({ file: '', name: '' } as TableListEntry)
  const cache = ref({ header: [], rows: [] } as TableCache)

  function tablePick(tableIndex: number) {
    const { data } = storeToRefs(useTableList())

    const table = data.value[tableIndex]

    if (!table) {
      console.warn('Table not found', tableIndex)
      return
    }

    listEntry.value = table

    const { tableGetCache } = useTableCache()

    syncRef(tableGetCache(table.file), cache, { deep: true, immediate: true, direction: 'ltr' })
  }

  const tableContent = computed(() => {
    return { ...listEntry.value, ...cache.value }
  })

  return { tableContent, tablePick }
})
