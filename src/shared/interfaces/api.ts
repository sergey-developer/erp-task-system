import { MaybeNull } from 'shared/interfaces/utils'

export type PaginatedListResponse<Result> = {
  count: number
  next: MaybeNull<string>
  previous: MaybeNull<string>
  results: Result[]
}
