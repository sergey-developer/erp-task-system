import { LocationTypeEnum } from 'shared/constants/catalogs'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'

import { EquipmentCatalogListModel } from './equipmentCatalogList.model'

export type GetEquipmentCatalogListQueryArgs = MaybeUndefined<
  Partial<{
    locationId: IdType
    locationType: LocationTypeEnum
  }>
>

export type GetEquipmentCatalogListSuccessResponse = EquipmentCatalogListModel
