export type ExtendSortKey<Keys extends string> = Keys | `-${Keys}`

// todo: переиспользовать
export type SortParams<T extends string> = Partial<{
  ordering: T
}>

// todo: переиспользовать
export type TableSortProps<T extends string> = Partial<{
  sort: T
}>
