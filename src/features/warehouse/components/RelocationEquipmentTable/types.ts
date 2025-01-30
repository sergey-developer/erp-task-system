import { TableProps } from 'antd'
import { MouseEvent } from 'react'

import { RelocationEquipmentListItemModel } from 'features/warehouse/models'

export type RelocationEquipmentTableItem = Pick<
  RelocationEquipmentListItemModel,
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
