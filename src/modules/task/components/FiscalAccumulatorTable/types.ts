import { TableProps } from 'antd'

import { FiscalAccumulatorListItemModel } from 'modules/task/models'

export type FiscalAccumulatorTableItem = FiscalAccumulatorListItemModel

export type FiscalAccumulatorTableProps = Required<
  Pick<TableProps<FiscalAccumulatorTableItem>, 'dataSource' | 'loading'>
>
