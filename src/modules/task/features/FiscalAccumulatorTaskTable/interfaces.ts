import { TableProps } from 'antd'

import { FiscalAccumulatorTaskListItemModel } from 'modules/task/models'

export type FiscalAccumulatorTaskTableItem = FiscalAccumulatorTaskListItemModel

export type FiscalAccumulatorTaskTableProps = Required<
  Pick<TableProps<FiscalAccumulatorTaskTableItem>, 'dataSource' | 'loading'>
>
