import { NamePath } from 'rc-field-form/es/interface'
import { Key } from 'react'

import { EquipmentsCatalogModel } from 'modules/warehouse/models'
import { SimplifiedRelocationTaskEquipment } from 'modules/warehouse/types/relocationTask/createSimplifiedRelocationTask'

export type RelocationEquipmentRow = Partial<SimplifiedRelocationTaskEquipment> & {
  rowId: number
}

export type ActiveEquipmentRow = Pick<RelocationEquipmentRow, 'relocationEquipmentId'> & {
  rowIndex: number
  tableName: RelocationEquipmentSimplifiedEditableTableProps['name']
}

export type RelocationEquipmentSimplifiedEditableTableProps = {
  name: NamePath
  required?: boolean
  isLoading: boolean

  editableKeys?: Key[]
  setEditableKeys?: (keys: Key[]) => void

  equipmentIsLoading: boolean
  equipmentListIsLoading?: boolean

  equipments: EquipmentsCatalogModel
  equipmentsIsLoading: boolean

  canCreateEquipment?: boolean
  onClickCreateEquipment?: (row: ActiveEquipmentRow) => void

  onClickCreateImage: (activeRow: ActiveEquipmentRow) => void
}
