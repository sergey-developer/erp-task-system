import { getTaskTableItem } from '_fixtures_/task'

import { DEFAULT_PAGE_SIZE } from '../../TaskListPage/constants'
import { TaskTableProps } from '../interfaces'

export const columnWithSortingClass = 'ant-table-column-has-sorters'

export const baseProps: Readonly<Omit<TaskTableProps, 'sort'>> = {
  dataSource: [getTaskTableItem()],
  loading: false,
  onRow: jest.fn(),
  onChange: jest.fn(),
  pagination: false,
  rowClassName: '',
}

export const paginationProps: TaskTableProps['pagination'] = {
  current: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  total: 120,
}

export const taskTableItemFromBaseProps = baseProps.dataSource![0]
