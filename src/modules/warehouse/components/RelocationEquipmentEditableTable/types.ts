import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { EquipmentCatalogListModel } from 'modules/warehouse/models'

import { CurrencyListModel } from 'shared/models/currency'
import { IdType } from 'shared/types/common'

export type RelocationEquipmentFormFields = {
  rowId: number
  id?: IdType
  serialNumber?: string
  purpose?: string
  condition?: EquipmentConditionEnum
  amount?: number
  price?: number
  currency?: IdType
  quantity?: number
}

export type RelocationEquipmentEditableTableProps = {
  currencyList: CurrencyListModel
  currencyListIsLoading: boolean

  equipmentList: EquipmentCatalogListModel
  equipmentListIsLoading: boolean
}
