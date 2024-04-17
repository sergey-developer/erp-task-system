export type ExtendSortKey<Keys extends string> = Keys | `-${Keys}`

export type SortParams<T extends string> = Partial<{
  ordering: T
}>

export type TableSortProps<T extends string> = Partial<{
  sort: T
}>
