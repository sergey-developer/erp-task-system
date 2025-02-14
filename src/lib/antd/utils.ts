import isNumber from 'lodash/isNumber'

import { AntdPagination } from 'lib/antd/types'

import { PaginationRequestParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'

export const getPaginatedList = <T>(
  response: PaginationResponse<T>,
  params?: PaginationRequestParams,
): AntdPagination<T> => ({
  pagination: {
    ...(isNumber(params?.offset) && params?.limit
      ? { current: params.offset / params.limit + 1, pageSize: params.limit }
      : {}),
    total: response.count,
  },
  results: response.results,
})
