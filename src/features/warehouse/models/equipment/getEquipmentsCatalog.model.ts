import { EquipmentConditionEnum } from 'features/warehouse/constants/equipment'

import { IdType } from 'shared/types/common'

import { EquipmentsCatalogModel } from './equipmentsCatalog.model'

export type GetEquipmentsCatalogQueryArgs = Partial<{
  locationId: IdType
  conditions: EquipmentConditionEnum[]
  isWarranty: boolean
  isCredited: boolean
  categories: IdType[]
}>

export type GetEquipmentsCatalogSuccessResponse = EquipmentsCatalogModel
