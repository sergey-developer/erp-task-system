import isNumber from 'lodash/isNumber'

import { AntdPaginatedList } from 'lib/antd/types'

import { PaginatedListSuccessResponse } from 'shared/models/pagination.model'
import { PaginationParams } from 'shared/types/pagination'

export const getPaginatedList = <T>(
  response: PaginatedListSuccessResponse<T>,
  params?: Partial<PaginationParams>,
): AntdPaginatedList<T> => ({
  pagination:
    isNumber(params?.offset) && params?.limit
      ? {
          current: params.offset / params.limit + 1,
          pageSize: params.limit,
          total: response.count,
        }
      : undefined,
  results: response.results,
})
