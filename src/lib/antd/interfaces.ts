import { PaginationProps } from 'antd'

export type AntdPaginatedList<ListItem> = {
  results: Array<ListItem>
  pagination?: Required<Pick<PaginationProps, 'current' | 'total' | 'pageSize'>>
}
