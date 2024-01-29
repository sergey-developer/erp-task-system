import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'

import { IdType } from 'shared/types/common'

import { EquipmentCatalogListModel } from './equipmentCatalogList.model'

export type GetEquipmentCatalogListQueryArgs = Partial<{
  locationId: IdType
  conditions: EquipmentConditionEnum[]
  isWarranty: boolean
  isCredited: boolean
}>

export type GetEquipmentCatalogListSuccessResponse = EquipmentCatalogListModel
