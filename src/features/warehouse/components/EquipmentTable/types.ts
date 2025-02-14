import { TableProps } from 'antd'
import { EquipmentDTO, GetEquipmentsSortValue } from 'features/warehouse/models'

export type EquipmentTableItem = Pick<
  EquipmentDTO,
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
  sort?: GetEquipmentsSortValue
}
