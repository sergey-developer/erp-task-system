import { getTaskTableItem } from '_fixtures_/task'

import { DEFAULT_PAGE_SIZE } from '../../TaskListPage/constants'
import { TaskTableProps } from '../interfaces'

export const columnWithSortingClass = 'ant-table-column-has-sorters'

export const baseProps: Readonly<TaskTableProps> = {
  dataSource: [getTaskTableItem()],
  loading: false,
  onRow: jest.fn(),
  onChange: jest.fn(),
  pagination: false,
  rowClassName: '',
  sort: 'ola_next_breach_time',
}

export const paginationProps: TaskTableProps['pagination'] = {
  current: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  total: 120,
}

export const taskTableItem = baseProps.dataSource![0]
