import { MaybeNull } from 'shared/interfaces/utils'

export type PaginatedListSuccessResponse<ListItem> = {
  count: number
  next: MaybeNull<string>
  previous: MaybeNull<string>
  results: Array<ListItem>
}
