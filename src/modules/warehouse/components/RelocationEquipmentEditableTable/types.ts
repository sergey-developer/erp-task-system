import { Key } from 'react'

import { EquipmentCatalogListModel } from 'modules/warehouse/models'
import { RelocationTaskEquipment } from 'modules/warehouse/types'

import { CurrencyListModel } from 'shared/models/currency'

export type RelocationEquipmentRow = Partial<RelocationTaskEquipment> & {
  rowId: number
}

export type ActiveEquipmentRow = Pick<RelocationEquipmentRow, 'relocationEquipmentId'> & {
  rowIndex: number
}

export type RelocationEquipmentEditableTableProps = {
  editableKeys?: Key[]
  setEditableKeys?: (keys: Key[]) => void

  isLoading: boolean

  equipmentIsLoading: boolean
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
