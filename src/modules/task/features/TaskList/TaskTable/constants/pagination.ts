import { TablePaginationConfig } from 'antd'

import { DEFAULT_PAGE_SIZE } from 'modules/task/features/TaskList/TaskListPage/constants'

export const paginationConfig: Readonly<
  Required<
    Pick<TablePaginationConfig, 'position'> & { pageSizeOptions: Array<number> }
  >
> = {
  position: ['bottomCenter'],
  pageSizeOptions: [50, DEFAULT_PAGE_SIZE, 150],
}
