export type TableCache = {
  header: string[]
  rows: (number | string)[][]
}

export const useTableCache = defineStore('table-cache', () => {
  function tableGetCache(tableName: string): Ref<TableCache> {
    const cache = useState(tableName, () => {
      const header = shallowReactive([] as TableCache['header'])
      const rows = shallowReactive([] as TableCache['rows'])

      useApiFetch<TableCache['header']>(`headers/${tableName}.json`).then((res) => {
        header.push(...res)
      })

      useApiFetch<TableCache['rows']>(`rows/${tableName}.json`).then((res) => {
        rows.push(...res)
      })

      return {
        header,
        rows,
      } satisfies TableCache as TableCache
    })

    return cache
  }

  return { tableGetCache }
})
