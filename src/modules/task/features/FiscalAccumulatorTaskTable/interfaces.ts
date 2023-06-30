import { TableProps } from 'antd/es/table/Table'

import { FiscalAccumulatorTaskListItemModel } from 'modules/task/models'

import { SortKey } from './constants/sort'

export type FiscalAccumulatorTaskTableItem = FiscalAccumulatorTaskListItemModel

export type FiscalAccumulatorTaskTableColumnKey =
  keyof FiscalAccumulatorTaskListItemModel

export type FiscalAccumulatorTaskTableProps = Required<
  Pick<
    TableProps<FiscalAccumulatorTaskTableItem>,
    'dataSource' | 'loading' | 'onChange'
  >
> & {
  sort?: SortKey
}
