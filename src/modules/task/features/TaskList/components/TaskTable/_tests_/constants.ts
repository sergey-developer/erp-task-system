import { getTaskTableItem } from '_fixtures_/task'

import { TaskTableProps } from '../interfaces'

export const columnWithSortingClass = 'ant-table-column-has-sorters'

export const baseProps: Readonly<TaskTableProps> = {
  dataSource: [getTaskTableItem()],
}

export const taskTableItem = baseProps.dataSource![0]
