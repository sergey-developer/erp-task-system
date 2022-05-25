import { MaybeNull } from 'shared/interfaces/utils'

export type PaginatedListResponse<ListItem> = {
  count: number
  next: MaybeNull<string>
  previous: MaybeNull<string>
  results: ListItem[]
}
