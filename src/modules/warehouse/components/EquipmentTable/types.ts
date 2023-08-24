import { TableProps } from 'antd'

import { EquipmentListItemModel } from 'modules/warehouse/models'

export type EquipmentTableItem = Pick<
  EquipmentListItemModel,
  | 'id'
  | 'title'
  | 'serialNumber'
  | 'inventoryNumber'
  | 'warehouse'
  | 'condition'
  | 'quantity'
  | 'category'
  | 'purpose'
>

export type EquipmentTableProps = Required<
  Pick<
    TableProps<EquipmentTableItem>,
    'dataSource' | 'loading' | 'onChange' | 'pagination'
  >
>
