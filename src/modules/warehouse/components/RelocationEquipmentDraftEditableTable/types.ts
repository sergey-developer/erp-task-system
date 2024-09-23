import { NamePath } from 'rc-field-form/es/interface'
import { Key } from 'react'

import {
  InventorizationEquipmentListItemModel,
  InventorizationEquipmentsModel,
} from 'modules/warehouse/models'
import { RelocationTaskInventorizationEquipment } from 'modules/warehouse/types'

import { CurrenciesModel } from 'shared/models/currency'

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

  currencies: CurrenciesModel
  currenciesIsLoading: boolean

  equipments: InventorizationEquipmentsModel
  equipmentsIsLoading: boolean
  equipmentIsLoading: boolean
  onChangeEquipment: (
    value: InventorizationEquipmentListItemModel['id'],
    option: { equipment: InventorizationEquipmentListItemModel['equipment'] },
    path: NamePath,
  ) => Promise<void>

  onClickCreateImage: (activeRow: ActiveEquipmentTableRow) => void
}
