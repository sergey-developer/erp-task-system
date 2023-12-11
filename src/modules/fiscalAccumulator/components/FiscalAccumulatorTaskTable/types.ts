import { TableProps } from 'antd'

import { FiscalAccumulatorTaskListItemModel } from 'modules/fiscalAccumulator/models'

export type FiscalAccumulatorTaskTableItem = Pick<
  FiscalAccumulatorTaskListItemModel,
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

export type FiscalAccumulatorTaskTableProps = Required<
  Pick<TableProps<FiscalAccumulatorTaskTableItem>, 'dataSource' | 'loading'>
>
