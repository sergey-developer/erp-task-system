import isNumber from 'lodash/isNumber'

import { AntdPaginatedList } from 'lib/antd/types'

import { PaginationResponse } from 'shared/models/pagination.model'
import { PaginationParams } from 'shared/types/pagination'

export const getPaginatedList = <T>(
  response: PaginationResponse<T>,
  params?: Partial<PaginationParams>,
): AntdPaginatedList<T> => ({
  pagination: {
    ...(isNumber(params?.offset) && params?.limit
      ? { current: params.offset / params.limit + 1, pageSize: params.limit }
      : {}),
    total: response.count,
  },
  results: response.results,
})
