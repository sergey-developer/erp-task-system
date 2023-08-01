import { MaybeNull } from 'shared/types/utils'

export type PaginatedListSuccessResponse<ListItem> = {
  count: number
  next: MaybeNull<string>
  previous: MaybeNull<string>
  results: Array<ListItem>
}
