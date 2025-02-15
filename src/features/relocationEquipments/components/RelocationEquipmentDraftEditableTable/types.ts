import { InventorizationEquipmentDTO } from 'features/inventorizations/api/dto'
import { RelocationEquipmentDTO } from 'features/relocationTasks/api/dto'
import { RelocationTaskInventorizationEquipment } from 'features/relocationTasks/types'
import { NamePath } from 'rc-field-form/es/interface'
import { Key } from 'react'

import { CurrenciesCatalogDTO } from 'shared/catalogs/currencies/api/dto'

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
    relocationEquipment?: RelocationEquipmentDTO
  })[]
  equipmentsIsLoading: boolean
  equipmentIsLoading: boolean
  onChangeEquipment: (
    value: InventorizationEquipmentDTO['id'],
    option: {
      equipment: InventorizationEquipmentDTO['equipment']
      relocationEquipment?: RelocationEquipmentDTO
    },
    path: NamePath,
  ) => Promise<void>

  onClickCreateImage: (activeRow: ActiveEquipmentTableRow) => void
}
