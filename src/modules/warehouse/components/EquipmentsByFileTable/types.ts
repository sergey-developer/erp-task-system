import { TableProps } from 'antd'

import { CreateEquipmentsBadRequestErrorResponse } from 'modules/warehouse/models'
import { ImportedEquipmentByFile } from 'modules/warehouse/types'

export type EquipmentByFileTableRow = Pick<
  ImportedEquipmentByFile,
  | 'rowId'
  | 'customerInventoryNumber'
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
> & {
  errors?: CreateEquipmentsBadRequestErrorResponse
}
