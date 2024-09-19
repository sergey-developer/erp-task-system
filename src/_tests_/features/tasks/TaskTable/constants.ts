import { TablePaginationConfig } from 'antd'

import { TaskTableProps } from 'modules/task/components/TaskTable/types'
import { DEFAULT_PAGE_SIZE } from 'modules/task/pages/TasksPage/constants'

import taskFixtures from '_tests_/fixtures/task/index'

export const taskTableItem = taskFixtures.taskTableItem()

export const props: Readonly<Omit<TaskTableProps, 'sort'>> = {
  dataSource: [taskTableItem],
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

export enum TestIdsEnum {
  TaskTable = 'task-table',
}
