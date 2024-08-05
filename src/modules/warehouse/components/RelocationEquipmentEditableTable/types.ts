import { NamePath } from 'rc-field-form/es/interface'
import { Key } from 'react'

import { EquipmentsCatalogModel } from 'modules/warehouse/models'
import { RelocationTaskEquipment } from 'modules/warehouse/types'

import { CurrencyListModel } from 'shared/models/currency'

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

  currencies: CurrencyListModel
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
