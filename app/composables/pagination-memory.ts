type Pagination = {
  limit: number
  offset: number
  total: number
}

export const usePaginationMemory = (name: string) => useState<Pagination>(
  `pagination-${name}`,
  () => ({
    limit: 100,
    offset: 0,
    total: 0,
  }),
)
