type Search = {
  text: string
}

export const useSearchMemory = (name: string) => useState<Search>(
  `search-${name}`,
  () => ({
    text: '',
  }),
)
