import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'
import { CustomerListModel, EquipmentCategoriesModel } from 'features/warehouse/models'
import { Moment } from 'moment-timezone'

import { LocationsCatalogModel } from 'shared/catalogs/api/dto/locations'
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
