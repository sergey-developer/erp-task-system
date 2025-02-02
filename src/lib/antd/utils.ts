import isNumber from 'lodash/isNumber'

import { AntdPaginatedList } from 'lib/antd/types'

import { PaginationParams, PaginationResponse } from 'shared/dto/api/pagination.dto'

export const getPaginatedList = <T>(
  response: PaginationResponse<T>,
  params?: PaginationParams,
): AntdPaginatedList<T> => ({
  pagination: {
    ...(isNumber(params?.offset) && params?.limit
      ? { current: params.offset / params.limit + 1, pageSize: params.limit }
      : {}),
    total: response.count,
  },
  results: response.results,
})
