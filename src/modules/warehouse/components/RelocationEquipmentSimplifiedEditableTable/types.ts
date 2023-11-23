import { NamePath } from 'rc-field-form/es/interface'
import { Key } from 'react'

import { EquipmentCatalogListModel } from 'modules/warehouse/models'
import { SimplifiedRelocationTaskFormEquipment } from 'modules/warehouse/types/relocationTask/simplifiedRelocationTaskForm'

export type ActiveEquipmentRow = {
  tableName: RelocationEquipmentSimplifiedEditableTableProps['name']
  rowId: number
  rowIndex: number
}

export type RelocationEquipmentRow = Partial<SimplifiedRelocationTaskFormEquipment>

export type RelocationEquipmentSimplifiedEditableTableProps = {
  name: NamePath

  editableKeys?: Key[]
  setEditableKeys?: (keys: Key[]) => void

  isLoading: boolean
  equipmentListIsLoading?: boolean

  equipmentCatalogList: EquipmentCatalogListModel
  equipmentCatalogListIsLoading: boolean

  canCreateEquipment?: boolean
  addEquipmentBtnDisabled?: boolean
  onClickCreateEquipment?: (row: ActiveEquipmentRow) => void
}
