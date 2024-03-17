import { TableProps } from 'antd'
import { TableRowSelection } from 'antd/es/table/interface'

import { BaseMtsrReportItemModel, GetMtsrReportBaseSortValue } from 'modules/reports/types'

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

export type MtsrReportTableProps = Required<
  Pick<TableProps<MtsrReportTableItem>, 'dataSource' | 'loading' | 'onChange'>
> & {
  onSelect: NonNullable<TableRowSelection<MtsrReportTableItem>['onChange']>
  sort?: GetMtsrReportBaseSortValue
}
