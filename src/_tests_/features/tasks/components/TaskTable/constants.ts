import { TablePaginationConfig } from 'antd'
import { TaskTableProps } from 'features/tasks/components/TaskTable/types'
import { DEFAULT_PAGE_SIZE } from 'features/tasks/pages/TasksPage/constants'

import tasksFixtures from '_tests_/fixtures/api/data/tasks/index'

export const tasksTableItem = tasksFixtures.tasksTableItem()

export const props: Readonly<Omit<TaskTableProps, 'sort'>> = {
  dataSource: [tasksTableItem],
  loading: false,
  onRow: jest.fn(),
  onChange: jest.fn(),
  pagination: false,
}

export const paginationProps: Readonly<
  Required<Pick<TablePaginationConfig, 'current' | 'pageSize' | 'total'>>
> = {
  current: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  total: DEFAULT_PAGE_SIZE + 1,
}
