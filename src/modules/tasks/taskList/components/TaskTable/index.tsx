import { ColumnsType } from 'antd/es/table'
import React, { FC, useMemo } from 'react'

import { ParentSizedTable } from 'components/Tables/ParentSizedTable'
import { SMART_SORT_DIRECTIONS_TO_SORT_FIELDS } from 'modules/tasks/taskList/components/TaskListPage/constants'
import { TaskListItemModel } from 'modules/tasks/taskList/models'

import { TABLE_COLUMNS } from './constants'
import { TaskTableProps } from './interfaces'
import { applySortingToColumn } from './utils'

const TaskTable: FC<TaskTableProps> = ({
  dataSource,
  loading,
  sorting,
  onChange,
  onRow,
  pagination,
}) => {
  const columnsData: ColumnsType<TaskListItemModel> = useMemo(() => {
    const sorterResult =
      (sorting &&
        sorting in SMART_SORT_DIRECTIONS_TO_SORT_FIELDS &&
        SMART_SORT_DIRECTIONS_TO_SORT_FIELDS[sorting]) ||
      undefined
    return applySortingToColumn(TABLE_COLUMNS, sorterResult)
  }, [sorting])

  return (
    <ParentSizedTable<TaskListItemModel>
      dataSource={dataSource}
      columns={columnsData}
      pagination={pagination && { ...pagination, position: ['bottomCenter'] }}
      loading={loading}
      rowKey='id'
      onRow={onRow}
      onChange={onChange}
      showSorterTooltip={false}
    />
  )
}

export default TaskTable
