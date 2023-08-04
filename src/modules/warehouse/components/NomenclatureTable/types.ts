import { TableProps } from 'antd'

export type NomenclatureTableItem = any

export type NomenclatureTableProps = Required<
  Pick<TableProps<NomenclatureTableItem>, 'dataSource' | 'loading'>
>
