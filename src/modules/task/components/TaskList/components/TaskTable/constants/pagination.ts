import { TablePaginationConfig } from 'antd'

import { DEFAULT_PAGE_SIZE } from 'modules/task/components/TaskList/components/TaskListPage/constants'

export const paginationConfig: TablePaginationConfig = {
  position: ['bottomCenter'],
  pageSizeOptions: [10, DEFAULT_PAGE_SIZE, 20, 50, 100],
}
