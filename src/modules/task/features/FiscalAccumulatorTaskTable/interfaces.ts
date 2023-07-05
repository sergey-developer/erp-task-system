import { TableProps } from 'antd/es/table/Table'

import { FiscalAccumulatorTaskListItemModel } from 'modules/task/models'

export type FiscalAccumulatorTaskTableItem = FiscalAccumulatorTaskListItemModel

export type FiscalAccumulatorTaskTableProps = Required<
  Pick<TableProps<FiscalAccumulatorTaskTableItem>, 'dataSource' | 'loading'>
>
