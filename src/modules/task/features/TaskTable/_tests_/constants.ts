import { TablePaginationConfig } from 'antd'

import taskFixtures from 'fixtures/task'
import { DEFAULT_PAGE_SIZE } from 'modules/task/pages/TaskListPage/constants'
import { UserRoleEnum } from 'shared/constants/roles'

import { TaskTableProps } from '../interfaces'

const columnWithSortingClass = 'ant-table-column-has-sorters'

const requiredProps: Readonly<Omit<TaskTableProps, 'sort'>> = {
  dataSource: [taskFixtures.getTaskTableItem()],
  loading: false,
  onRow: jest.fn(),
  onChange: jest.fn(),
  pagination: false,
  rowClassName: '',
  userRole: UserRoleEnum.FirstLineSupport,
}

const paginationProps: Readonly<
  Required<Pick<TablePaginationConfig, 'current' | 'pageSize' | 'total'>>
> = {
  current: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  total: DEFAULT_PAGE_SIZE + 1,
}

const firstTaskTableItem = requiredProps.dataSource[0]

const testConstants = {
  columnWithSortingClass,
  requiredProps,
  paginationProps,
  firstTaskTableItem,
}

export default testConstants
