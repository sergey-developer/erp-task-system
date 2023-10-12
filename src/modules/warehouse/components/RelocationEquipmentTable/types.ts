import { TableProps } from 'antd'

import { RelocationEquipmentListItemModel } from 'modules/warehouse/models'

export type RelocationEquipmentTableItem = Pick<
  RelocationEquipmentListItemModel,
  'id' | 'title' | 'serialNumber' | 'condition' | 'purpose' | 'quantity' | 'price' | 'currency'
>

export type RelocationEquipmentTableProps = Required<
  Pick<TableProps<RelocationEquipmentTableItem>, 'dataSource' | 'loading'>
>
