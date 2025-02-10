import { TableProps } from 'antd'
import { FiscalAccumulatorTaskDTO } from 'features/reports/api/dto'

export type FiscalAccumulatorTasksReportTableItem = Pick<
  FiscalAccumulatorTaskDTO,
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
