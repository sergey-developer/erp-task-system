import { TableProps } from 'antd'
import { TableRowSelection } from 'antd/es/table/interface'

import { BaseMtsrReportItemModel, GetMtsrReportBaseSortValue } from 'features/reports/types'

import { TableSortProps } from 'shared/types/sort'
import { SetNonNullable } from 'shared/types/utils'

export type MtsrReportTableItem = Pick<
  BaseMtsrReportItemModel,
  | 'id'
  | 'title'
  | 'averageExecutionTime'
  | 'returnedAmount'
  | 'allTasks'
  | 'completedTasks'
  | 'overdueTasks'
>

export type MtsrReportTableProps = SetNonNullable<
  Pick<TableProps<MtsrReportTableItem>, 'dataSource' | 'loading' | 'onChange'>
> &
  TableSortProps<GetMtsrReportBaseSortValue> &
  SetNonNullable<TableRowSelection<MtsrReportTableItem>, 'selectedRowKeys'> & {
    onSelect: NonNullable<TableRowSelection<MtsrReportTableItem>['onChange']>
  }
