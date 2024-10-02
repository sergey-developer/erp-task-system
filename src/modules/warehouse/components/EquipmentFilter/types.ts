import { Moment } from 'moment-timezone'

import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { CustomerListModel, EquipmentCategoriesModel } from 'modules/warehouse/models'

import { LocationsCatalogModel } from 'shared/models/catalogs/locations'
import { EmptyFn } from 'shared/types/utils'

export type EquipmentsFilterFormFields = Partial<{
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

  values?: EquipmentsFilterFormFields
  initialValues: EquipmentsFilterFormFields

  locations: LocationsCatalogModel
  locationsIsLoading: boolean

  categories: EquipmentCategoriesModel
  categoriesIsLoading: boolean

  owners: CustomerListModel
  ownersIsLoading: boolean

  onApply: (values: EquipmentsFilterFormFields) => void
  onClose: EmptyFn
}
