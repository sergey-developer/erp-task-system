import { TablePaginationConfig } from 'antd'
import head from 'lodash/head'

import { getTaskTableItem } from 'fixtures/task'

import { DEFAULT_PAGE_SIZE } from '../../TaskListPage/constants'
import { TaskTableProps } from '../interfaces'

export const columnWithSortingClass = 'ant-table-column-has-sorters'

export const requiredProps: Readonly<Omit<TaskTableProps, 'sort'>> = {
  dataSource: [getTaskTableItem()],
  loading: false,
  onRow: jest.fn(),
  onChange: jest.fn(),
  pagination: false,
  rowClassName: '',
}

export const paginationProps: Readonly<
  Required<Pick<TablePaginationConfig, 'current' | 'pageSize' | 'total'>>
> = {
  current: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  total: DEFAULT_PAGE_SIZE + 1,
}

export const firstTaskTableItem = head(requiredProps.dataSource)!
