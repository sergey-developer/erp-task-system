import { PaginationProps } from 'antd'

export type AntdPaginatedList<ListItem> = {
  results: ListItem[]
  pagination?: Required<Pick<PaginationProps, 'current' | 'total' | 'pageSize'>>
}
