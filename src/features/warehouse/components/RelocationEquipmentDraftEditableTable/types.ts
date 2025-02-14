import {
  InventorizationEquipmentDTO,
  RelocationEquipmentListItemModel,
} from 'features/warehouse/models'
import { RelocationTaskInventorizationEquipment } from 'features/warehouse/types'
import { NamePath } from 'rc-field-form/es/interface'
import { Key } from 'react'

import { CurrenciesCatalogDTO } from 'shared/catalogs/api/dto/currencies'

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

  currencies: CurrenciesCatalogDTO
  currenciesIsLoading: boolean

  equipments: (InventorizationEquipmentDTO & {
    relocationEquipment?: RelocationEquipmentListItemModel
  })[]
  equipmentsIsLoading: boolean
  equipmentIsLoading: boolean
  onChangeEquipment: (
    value: InventorizationEquipmentDTO['id'],
    option: {
      equipment: InventorizationEquipmentDTO['equipment']
      relocationEquipment?: RelocationEquipmentListItemModel
    },
    path: NamePath,
  ) => Promise<void>

  onClickCreateImage: (activeRow: ActiveEquipmentTableRow) => void
}
