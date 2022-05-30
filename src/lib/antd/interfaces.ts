import { PaginationProps } from 'antd'

export type AntdPaginatedList<ListItem> = {
  pagination: Required<Pick<PaginationProps, 'current' | 'total' | 'pageSize'>>
  results: Array<ListItem>
}
