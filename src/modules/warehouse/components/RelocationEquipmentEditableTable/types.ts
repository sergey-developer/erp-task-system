import { Key } from 'react'

import { EquipmentCatalogListModel } from 'modules/warehouse/models'
import { RelocationTaskFormEquipment } from 'modules/warehouse/types'

import { CurrencyListModel } from 'shared/models/currency'

export type ActiveEquipmentRow = Pick<RelocationEquipmentRow, 'id' | 'rowId' | 'inCreatedTask'> & {
  rowIndex: number
}

export type RelocationEquipmentRow = Partial<RelocationTaskFormEquipment> & {
  rowId: number
  inCreatedTask: boolean
}

export type RelocationEquipmentEditableTableProps = {
  editableKeys?: Key[]
  setEditableKeys?: (keys: Key[]) => void

  isLoading: boolean
  equipmentListIsLoading?: boolean

  currencyList: CurrencyListModel
  currencyListIsLoading: boolean

  equipmentCatalogList: EquipmentCatalogListModel
  equipmentCatalogListIsLoading: boolean

  canAddEquipment: boolean
  addEquipmentBtnDisabled: boolean
  onClickAddEquipment: (activeRow: ActiveEquipmentRow) => void

  onClickAddImage: (activeRow: ActiveEquipmentRow) => void
}
