import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { EquipmentCategoriesDTO } from 'features/equipments/api/dto'
import { Moment } from 'moment-timezone'

import { CustomersCatalogDTO } from 'shared/catalogs/customers/api/dto'
import { LocationsCatalogDTO } from 'shared/catalogs/locations/api/dto'
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

  owners: CustomersCatalogDTO
  ownersIsLoading: boolean

  onApply: (values: EquipmentsFilterFormFields) => void
  onClose: EmptyFn
}
