import { Moment } from 'moment-timezone'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import {
  CustomerListModel,
  EquipmentCategoryListModel,
  WarehouseListModel,
} from 'modules/warehouse/models'

import { EmptyFn } from 'shared/types/utils'

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
  zeroQuantity: boolean
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
  onClose: EmptyFn
}
