import { TablePaginationConfig } from 'antd'
import isNumber from 'lodash/isNumber'

import { PaginationParams } from 'shared/dto/api/pagination.dto'

export const getInitialPaginationParams = (
  params?: PaginationParams,
): Required<PaginationParams> => ({
  limit: params?.limit || 50,
  offset: params?.offset || 0,
})

export const calculatePaginationParams = ({
  current,
  pageSize,
}: Pick<TablePaginationConfig, 'current' | 'pageSize'>): Pick<
  Required<PaginationParams>,
  'limit' | 'offset'
> =>
  isNumber(pageSize) && isNumber(current)
    ? { limit: pageSize, offset: (current - 1) * pageSize }
    : getInitialPaginationParams()

export const extractPaginationResults = <T extends { results: T['results'] }>(
  value?: T,
): T['results'] => value?.results || []

export const extractPaginationParams = <T extends { pagination: T['pagination'] }>(
  value?: T,
): T['pagination'] => value?.pagination || false
