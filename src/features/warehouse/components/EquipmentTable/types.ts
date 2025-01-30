import { TableProps } from 'antd'

import { EquipmentListItemModel, GetEquipmentListSortValue } from 'features/warehouse/models'

export type EquipmentTableItem = Pick<
  EquipmentListItemModel,
  | 'id'
  | 'title'
  | 'serialNumber'
  | 'inventoryNumber'
  | 'location'
  | 'condition'
  | 'quantity'
  | 'category'
  | 'purpose'
  | 'isCredited'
>

export type EquipmentTableProps = Required<
  Pick<
    TableProps<EquipmentTableItem>,
    'dataSource' | 'loading' | 'onChange' | 'onRow' | 'pagination'
  >
> & {
  sort?: GetEquipmentListSortValue
}
