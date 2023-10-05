import { EquipmentCatalogListModel } from 'modules/warehouse/models'
import { CreateRelocationTaskFormFields } from 'modules/warehouse/pages/CreateRelocationTaskPage/types'

import { CurrencyListModel } from 'shared/models/currency'
import { ArrayFirst } from 'shared/types/utils'

export type RelocationEquipmentFormFields = {
  rowId: number
} & Partial<ArrayFirst<CreateRelocationTaskFormFields['equipments']>>

export type RelocationEquipmentEditableTableProps = {
  isLoading: boolean

  currencyList: CurrencyListModel
  currencyListIsLoading: boolean

  equipmentList: EquipmentCatalogListModel
  equipmentListIsLoading: boolean
}
