import { EquipmentsCatalogModel } from 'features/warehouse/models'
import { RelocationTaskEquipment } from 'features/warehouse/types'
import { NamePath } from 'rc-field-form/es/interface'
import { Key } from 'react'

import { CurrenciesCatalogModel } from 'shared/catalogs/api/dto/currencies'

export type RelocationEquipmentRow = Partial<RelocationTaskEquipment> & {
  rowId: number
}

export type ActiveEquipmentRow = Pick<RelocationEquipmentRow, 'relocationEquipmentId'> & {
  rowIndex: number
}

export type RelocationEquipmentEditableTableProps = {
  name: NamePath
  editableKeys?: Key[]
  setEditableKeys?: (keys: Key[]) => void
  isLoading: boolean

  currencies: CurrenciesCatalogModel
  currenciesIsLoading: boolean

  relocationEquipmentsIsLoading?: boolean

  equipments: EquipmentsCatalogModel
  equipmentsIsLoading: boolean
  equipmentIsLoading: boolean

  canCreateEquipment?: boolean
  createEquipmentBtnDisabled: boolean
  onClickCreateEquipment: (activeRow: ActiveEquipmentRow) => void

  onClickCreateImage: (activeRow: ActiveEquipmentRow) => void
}
