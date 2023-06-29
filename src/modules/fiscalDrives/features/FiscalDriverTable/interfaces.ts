import { TableProps } from 'antd/es/table/Table'

import { FiscalDriverListItemModel } from 'modules/fiscalDrives/models'

import { SortKey } from './constants/sort'

export type FiscalDriverTableItem = FiscalDriverListItemModel

export type FiscalDriverTableColumnKey = keyof FiscalDriverListItemModel

export type FiscalDriverTableProps = Required<
  Pick<TableProps<FiscalDriverTableItem>, 'dataSource' | 'loading' | 'onChange'>
> & {
  sort?: SortKey
}
