import { PaginationResponse } from 'shared/models/pagination.model'
import { ArrayFirst } from 'shared/types/utils'

export const paginatedListResponse = <T extends any[]>(
  list: T,
): PaginationResponse<ArrayFirst<T>> => ({
  results: list,
  count: list.length,
  next: null,
  previous: null,
})
