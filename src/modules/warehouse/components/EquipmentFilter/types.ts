import { Moment } from 'moment-timezone'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
  CustomerListModel,
  EquipmentCategoryListModel,
  WarehouseListModel,
} from 'modules/warehouse/models'

export type EquipmentFilterFormFields = Partial<{
  conditions: EquipmentConditionEnum[]
  warehouses: number[]
  owners: number[]
  categories: number[]
  isNew: boolean
  isWarranty: boolean
  isRepaired: boolean
  priceFrom: number
  priceTo: number
  createdAt: [Moment, Moment]
}>

export type EquipmentFilterProps = {
  visible: boolean

  values?: EquipmentFilterFormFields
  initialValues: EquipmentFilterFormFields

  warehouseList: WarehouseListModel
  warehouseListIsLoading: boolean

  categoryList: EquipmentCategoryListModel
  categoryListIsLoading: boolean

  ownerList: CustomerListModel
  ownerListIsLoading: boolean

  onApply: (values: EquipmentFilterFormFields) => void
  onClose: () => void
}
