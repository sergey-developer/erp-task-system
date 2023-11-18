import { Key } from 'react'

import { EquipmentCatalogListModel } from 'modules/warehouse/models'
import { RelocationTaskFormFields } from 'modules/warehouse/types'

import { CurrencyListModel } from 'shared/models/currency'
import { ArrayFirst } from 'shared/types/utils'

export type CurrentEquipmentRow = {
  id?: number
  rowId: number
  rowIndex: number
}

export type RelocationEquipmentRowFields = Partial<
  ArrayFirst<RelocationTaskFormFields['equipments']>
>

export type RelocationEquipmentEditableTableProps = {
  editableKeys?: Key[]
  setEditableKeys?: (keys: Key[]) => void

  isLoading: boolean
  equipmentListIsLoading?: boolean

  currencyList: CurrencyListModel
  currencyListIsLoading: boolean

  equipmentCatalogList: EquipmentCatalogListModel
  equipmentCatalogListIsLoading: boolean

  canAddEquipment: boolean
  addEquipmentBtnDisabled: boolean
  onClickAddEquipment: (data: CurrentEquipmentRow) => void

  onClickAddImage: (data: CurrentEquipmentRow) => void
}
