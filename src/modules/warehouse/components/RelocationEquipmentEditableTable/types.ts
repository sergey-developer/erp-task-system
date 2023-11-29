import { Key } from 'react'

import { EquipmentCatalogListModel } from 'modules/warehouse/models'
import { RelocationTaskFormEquipment } from 'modules/warehouse/types'

import { CurrencyListModel } from 'shared/models/currency'

export type ActiveEquipmentRow = Pick<RelocationEquipmentRow, 'id' | 'rowId'> & {
  rowIndex: number
}

export type RelocationEquipmentRow = Partial<RelocationTaskFormEquipment> & {
  rowId: number
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

  canCreateEquipment: boolean
  addEquipmentBtnDisabled: boolean
  onClickCreateEquipment: (activeRow: ActiveEquipmentRow) => void

  onClickAddImage: (activeRow: ActiveEquipmentRow) => void
}
