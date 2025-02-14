import { MaybeNull } from 'shared/types/utils'

export type PaginationResponse<T> = {
  count: number
  next: MaybeNull<string>
  previous: MaybeNull<string>
  results: T[]
}

export type PaginationRequestParams = Partial<{
  limit: number
  offset: number
}>
