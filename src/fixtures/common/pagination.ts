import { ArrayFirst } from 'shared/types/utils'
import { PaginatedListSuccessResponse } from 'shared/models'

export const paginatedListResponse = <T extends any[]>(
  list: T,
): PaginatedListSuccessResponse<ArrayFirst<T>> => ({
  results: list,
  count: list.length,
  next: null,
  previous: null,
})
