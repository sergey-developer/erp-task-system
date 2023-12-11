import { TableProps } from 'antd'

import { FiscalAccumulatorTaskListItemModel } from 'modules/fiscalAccumulator/models'

export type FiscalAccumulatorTableItem = Pick<
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

export type FiscalAccumulatorTableProps = Required<
  Pick<TableProps<FiscalAccumulatorTableItem>, 'dataSource' | 'loading'>
>
