import { TablePaginationConfig } from 'antd'

import { PaginationParams } from 'shared/types/pagination'

export const calculatePaginationParams = ({
  current,
  pageSize,
}: Pick<TablePaginationConfig, 'current' | 'pageSize'>): Pick<
  PaginationParams,
  'limit' | 'offset'
> => ({
  offset: current && pageSize ? (current - 1) * pageSize : 0,
  limit: pageSize || 0,
})
