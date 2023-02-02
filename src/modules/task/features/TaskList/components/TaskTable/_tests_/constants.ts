import { TablePaginationConfig } from 'antd'
import head from 'lodash/head'

import { taskFixtures } from 'fixtures/task'
import { UserRolesEnum } from 'shared/constants/roles'

import { DEFAULT_PAGE_SIZE } from '../../TaskListPage/constants'
import { TaskTableProps } from '../interfaces'

const columnWithSortingClass = 'ant-table-column-has-sorters'

const requiredProps: Readonly<Omit<TaskTableProps, 'sort'>> = {
  dataSource: [taskFixtures.getTaskTableItem()],
  loading: false,
  onRow: jest.fn(),
  onChange: jest.fn(),
  pagination: false,
  rowClassName: '',
  userRole: UserRolesEnum.Engineer,
}

const paginationProps: Readonly<
  Required<Pick<TablePaginationConfig, 'current' | 'pageSize' | 'total'>>
> = {
  current: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  total: DEFAULT_PAGE_SIZE + 1,
}

const firstTaskTableItem = head(requiredProps.dataSource)!

const testConstants = {
  columnWithSortingClass,
  requiredProps,
  paginationProps,
  firstTaskTableItem,
}

export default testConstants
