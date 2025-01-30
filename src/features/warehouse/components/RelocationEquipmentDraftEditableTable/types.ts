import {
  InventorizationEquipmentListItemModel,
  RelocationEquipmentListItemModel,
} from 'features/warehouse/models'
import { RelocationTaskInventorizationEquipment } from 'features/warehouse/types'
import { NamePath } from 'rc-field-form/es/interface'
import { Key } from 'react'

import { CurrenciesModel } from 'shared/catalogs/models/currencies'

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

  currencies: CurrenciesModel
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
