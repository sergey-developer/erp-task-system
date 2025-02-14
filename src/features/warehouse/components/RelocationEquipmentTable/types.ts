import { TableProps } from 'antd'
import { RelocationEquipmentDTO } from 'features/warehouse/models'
import { MouseEvent } from 'react'

export type RelocationEquipmentTableItem = Pick<
  RelocationEquipmentDTO,
  | 'id'
  | 'relocationEquipmentId'
  | 'title'
  | 'serialNumber'
  | 'condition'
  | 'purpose'
  | 'quantity'
  | 'price'
  | 'currency'
>

export type RelocationEquipmentTableProps = Required<
  Pick<TableProps<RelocationEquipmentTableItem>, 'dataSource' | 'loading'> & {
    onClickImages: (event: MouseEvent, equipment: RelocationEquipmentTableItem) => void
  }
>
