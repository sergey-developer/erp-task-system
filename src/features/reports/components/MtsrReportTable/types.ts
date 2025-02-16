import { TableProps } from 'antd'
import { TableRowSelection } from 'antd/es/table/interface'
import { BaseMtsrReportItemDTO } from 'features/reports/api/dto'
import { GetMtsrReportBaseSortValue } from 'features/reports/api/schemas'

import { TableSortProps } from 'shared/types/sort'
import { SetNonNullable } from 'shared/types/utils'

export type MtsrReportTableItem = Pick<
  BaseMtsrReportItemDTO,
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
