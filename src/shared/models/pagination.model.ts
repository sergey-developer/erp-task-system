import { MaybeNull } from 'shared/types/utils'

export type PaginationResponse<ListItem> = {
  count: number
  next: MaybeNull<string>
  previous: MaybeNull<string>
  results: ListItem[]
}
