import { NamePath } from 'rc-field-form/es/interface'
import { Key } from 'react'

import { InventorizationEquipmentsModel } from 'modules/warehouse/models'
import { RelocationTaskInventorizationEquipment } from 'modules/warehouse/types'

import { CurrencyListModel } from 'shared/models/currency'

export type InventorizationEquipmentTableRow = Partial<RelocationTaskInventorizationEquipment> & {
  rowId: number
}

export type ActiveEquipmentTableRow = {
  rowIndex: number
}

export type RelocationEquipmentDraftEditableTableProps = {
  name: NamePath
  editableKeys?: Key[]
  setEditableKeys?: (keys: Key[]) => void
  isLoading: boolean

  currencies: CurrencyListModel
  currenciesIsLoading: boolean

  equipments: InventorizationEquipmentsModel
  equipmentsIsLoading: boolean
  equipmentIsLoading: boolean

  onClickCreateImage: (activeRow: ActiveEquipmentTableRow) => void
}
