import { PaginatedListResponseModel } from 'shared/models'

export const getPaginatedListResponse = <T extends any[]>(
  list: T,
): PaginatedListResponseModel<T[number]> => ({
  results: list,
  count: list.length,
  next: null,
  previous: null,
})
