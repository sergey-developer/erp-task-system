import { Moment } from 'moment-timezone'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { CustomerListModel, EquipmentCategoryListModel } from 'modules/warehouse/models'

import { LocationsModel } from 'shared/models/catalogs/location'
import { EmptyFn } from 'shared/types/utils'

export type EquipmentFilterFormFields = Partial<{
  conditions: EquipmentConditionEnum[]
  locations: number[]
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

  locations: LocationsModel
  locationsIsLoading: boolean

  categories: EquipmentCategoryListModel
  categoriesIsLoading: boolean

  owners: CustomerListModel
  ownersIsLoading: boolean

  onApply: (values: EquipmentFilterFormFields) => void
  onClose: EmptyFn
}
