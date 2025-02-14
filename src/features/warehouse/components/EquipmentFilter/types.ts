import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { CustomersModel, EquipmentCategoriesDTO } from 'features/warehouse/models'
import { Moment } from 'moment-timezone'

import { LocationsCatalogDTO } from 'shared/catalogs/api/dto/locations'
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

  locations: LocationsCatalogDTO
  locationsIsLoading: boolean

  categories: EquipmentCategoriesDTO
  categoriesIsLoading: boolean

  owners: CustomersModel
  ownersIsLoading: boolean

  onApply: (values: EquipmentsFilterFormFields) => void
  onClose: EmptyFn
}
