import { EquipmentConditionEnum } from 'features/equipments/api/constants'

import { IdType } from 'shared/types/common'

import { EquipmentsCatalogDTO } from '../dto'

export type GetEquipmentsCatalogRequest = Partial<{
  locationId: IdType
  conditions: EquipmentConditionEnum[]
  isWarranty: boolean
  isCredited: boolean
  categories: IdType[]
}>

export type GetEquipmentsCatalogResponse = EquipmentsCatalogDTO
