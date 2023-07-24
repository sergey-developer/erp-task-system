import { ArrayFirst } from 'shared/interfaces/utils'
import { PaginatedListSuccessResponse } from 'shared/models'

export const fakePaginatedListResponse = <T extends any[]>(
  list: T,
): PaginatedListSuccessResponse<ArrayFirst<T>> => ({
  results: list,
  count: list.length,
  next: null,
  previous: null,
})
