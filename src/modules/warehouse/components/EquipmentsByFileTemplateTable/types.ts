import { TableProps } from 'antd'

import { EquipmentByFileTemplateModel } from 'modules/warehouse/models'

export type EquipmentByFileTemplateTableRow = Pick<
  EquipmentByFileTemplateModel,
  | 'id'
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

export type EquipmentsByFileTemplateTableProps = Required<
  Pick<TableProps<EquipmentByFileTemplateTableRow>, 'dataSource'>
>
