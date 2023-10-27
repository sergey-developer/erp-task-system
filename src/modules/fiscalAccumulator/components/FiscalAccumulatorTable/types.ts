import { TableProps } from 'antd'

import { FiscalAccumulatorListItemModel } from 'modules/fiscalAccumulator/models'

export type FiscalAccumulatorTableItem = Pick<
  FiscalAccumulatorListItemModel,
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
>

export type FiscalAccumulatorTableProps = Required<
  Pick<TableProps<FiscalAccumulatorTableItem>, 'dataSource' | 'loading'>
>
