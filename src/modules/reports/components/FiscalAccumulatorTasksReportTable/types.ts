import { TableProps } from 'antd'

import { FiscalAccumulatorTaskListItemModel } from 'modules/reports/models'

export type FiscalAccumulatorTasksReportTableItem = Pick<
  FiscalAccumulatorTaskListItemModel,
  | 'id'
  | 'blockingIn'
  | 'olaNextBreachTime'
  | 'recordId'
  | 'sapId'
  | 'name'
  | 'address'
  | 'fiscalAccumulator'
  | 'deadlineOrTotalFiscalDocs'
  | 'supportGroup'
  | 'title'
  | 'createdAt'
  | 'faFormat'
  | 'assignee'
  | 'comment'
>

export type FiscalAccumulatorTasksReportTableProps = Required<
  Pick<TableProps<FiscalAccumulatorTasksReportTableItem>, 'loading' | 'onRow'>
> & {
  dataSource: NonNullable<TableProps<FiscalAccumulatorTasksReportTableItem>['dataSource']>
}
