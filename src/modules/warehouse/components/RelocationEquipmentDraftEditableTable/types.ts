import { NamePath } from 'rc-field-form/es/interface'
import { Key } from 'react'

import {
  InventorizationEquipmentListItemModel,
  RelocationEquipmentListItemModel,
} from 'modules/warehouse/models'
import { RelocationTaskInventorizationEquipment } from 'modules/warehouse/types'

import { CurrencyListModel } from 'shared/models/currency'

export type InventorizationEquipmentTableRow = Partial<RelocationTaskInventorizationEquipment> & {
  rowId: number
}

export type ActiveEquipmentTableRow = Pick<
  RelocationTaskInventorizationEquipment,
  'relocationEquipmentId'
> & {
  rowIndex: number
}

export type RelocationEquipmentDraftEditableTableProps = {
  name: NamePath
  editableKeys?: Key[]
  setEditableKeys?: (keys: Key[]) => void
  isLoading: boolean

  relocationEquipmentsIsLoading?: boolean

  currencies: CurrencyListModel
  currenciesIsLoading: boolean

  equipments: (InventorizationEquipmentListItemModel & {
    relocationEquipment?: RelocationEquipmentListItemModel
  })[]
  equipmentsIsLoading: boolean
  equipmentIsLoading: boolean
  onChangeEquipment: (
    value: InventorizationEquipmentListItemModel['id'],
    option: {
      equipment: InventorizationEquipmentListItemModel['equipment']
      relocationEquipment?: RelocationEquipmentListItemModel
    },
    path: NamePath,
  ) => Promise<void>

  onClickCreateImage: (activeRow: ActiveEquipmentTableRow) => void
}
