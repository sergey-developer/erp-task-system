import { NamePath } from 'rc-field-form/es/interface'
import { Key } from 'react'

import { EquipmentCatalogListModel } from 'modules/warehouse/models'
import { SimplifiedRelocationTaskEquipment } from 'modules/warehouse/types/relocationTask/simplifiedRelocationTaskForm'

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

  equipmentCatalogList: EquipmentCatalogListModel
  equipmentCatalogListIsLoading: boolean

  canCreateEquipment?: boolean
  onClickCreateEquipment?: (row: ActiveEquipmentRow) => void
}
