import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'

import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'

import { EquipmentCatalogListModel } from './equipmentCatalogList.model'

export type GetEquipmentCatalogListQueryArgs = MaybeUndefined<
  Partial<{
    locationId: IdType
    conditions: EquipmentConditionEnum[]
  }>
>

export type GetEquipmentCatalogListSuccessResponse = EquipmentCatalogListModel
