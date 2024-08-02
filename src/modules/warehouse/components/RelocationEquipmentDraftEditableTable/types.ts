import { NamePath } from 'rc-field-form/es/interface'
import { Key } from 'react'

import { EquipmentsCatalogModel } from 'modules/warehouse/models'
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

  equipmentIsLoading: boolean
  equipmentsIsLoading?: boolean

  currencies: CurrencyListModel
  currenciesIsLoading: boolean

  equipmentsCatalog: EquipmentsCatalogModel
  equipmentsCatalogIsLoading: boolean
  equipmentsCatalogDisabled?: boolean

  onClickCreateImage: (activeRow: ActiveEquipmentTableRow) => void
}
