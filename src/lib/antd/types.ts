import { PaginationProps } from 'antd'

export type AntdPaginatedList<ListItem> = {
  results: ListItem[]
  pagination: Pick<PaginationProps, 'current' | 'total' | 'pageSize'>
}
