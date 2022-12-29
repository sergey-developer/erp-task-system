import { ArrayItem } from 'shared/interfaces/utils'
import { PaginatedListResponseModel } from 'shared/models'

export const getPaginatedListResponse = <T extends any[]>(
  list: T,
): PaginatedListResponseModel<ArrayItem<T>> => ({
  results: list,
  count: list.length,
  next: null,
  previous: null,
})
