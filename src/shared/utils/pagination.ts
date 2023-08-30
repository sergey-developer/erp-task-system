import { TablePaginationConfig } from 'antd'
import isNumber from 'lodash/isNumber'

import { PaginationParams } from 'shared/types/pagination'

export const getInitialPaginationParams = (
  defaults?: Partial<PaginationParams>,
): PaginationParams => ({
  limit: defaults?.limit || 10,
  offset: defaults?.offset || 0,
})

export const calculatePaginationParams = ({
  current,
  pageSize,
}: Pick<TablePaginationConfig, 'current' | 'pageSize'>): Pick<
  PaginationParams,
  'limit' | 'offset'
> => {
  if (isNumber(pageSize) && isNumber(current)) {
    return {
      limit: pageSize,
      offset: (current - 1) * pageSize,
    }
  }

  return getInitialPaginationParams()
}
