import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'

export type EquipmentsFilterParams = Partial<{
  conditions: EquipmentConditionEnum[]
  locations: number[]
  owners: number[]
  categories: number[]
  isNew: boolean
  isWarranty: boolean
  isRepaired: boolean
  priceFrom: number
  priceTo: number
  createdAtFrom: string
  createdAtTo: string
  quantityGt: number
}>
