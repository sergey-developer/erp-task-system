import { PaginationProps } from 'antd'

export type AntdPagination<T> = {
  results: T[]
  pagination: Pick<PaginationProps, 'current' | 'total' | 'pageSize'>
}
