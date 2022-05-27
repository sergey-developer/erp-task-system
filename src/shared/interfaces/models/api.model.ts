import { MaybeNull } from 'shared/interfaces/utils'

export type PaginatedListResponseModel<ListItem> = {
  count: number
  next: MaybeNull<string>
  previous: MaybeNull<string>
  results: ListItem[]
}
