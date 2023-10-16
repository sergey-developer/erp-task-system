import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'

export type EquipmentFilterParams = Partial<{
  conditions: EquipmentConditionEnum[]
  warehouses: number[]
  owners: number[]
  categories: number[]
  isNew: boolean
  isWarranty: boolean
  isRepaired: boolean
  priceFrom: number
  priceTo: number
  createdAtFrom: string
  createdAtTo: string
}>
