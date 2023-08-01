import { ArrayItem } from 'shared/interfaces/utils'
import { PaginatedListSuccessResponse } from 'shared/models'

export const fakePaginatedListResponse = <T extends any[]>(
  list: T,
): PaginatedListSuccessResponse<ArrayItem<T>> => ({
  results: list,
  count: list.length,
  next: null,
  previous: null,
})
