import { TableProps } from 'antd'

import { EquipmentByFile } from 'modules/warehouse/types'

export type EquipmentByFileTableRow = Pick<
  EquipmentByFile,
  | 'rowId'
  | 'inventoryNumber'
  | 'serialNumber'
  | 'comment'
  | 'condition'
  | 'quantity'
  | 'price'
  | 'usageCounter'
  | 'isNew'
  | 'isWarranty'
  | 'isRepaired'
  | 'category'
  | 'currency'
  | 'owner'
  | 'purpose'
  | 'nomenclature'
>

export type EquipmentsByFileTableProps = Required<
  Pick<TableProps<EquipmentByFileTableRow>, 'dataSource'>
>
