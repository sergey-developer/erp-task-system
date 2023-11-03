import { WarehouseTypeEnum } from 'modules/warehouse/constants/warehouse'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import { MaybeUndefined } from 'shared/types/utils'

import { LocationListModel } from './locationList.model'

export type GetLocationListQueryArgs = MaybeUndefined<
  Partial<{
    locationTypes: LocationTypeEnum[]
    warehouseTypes: WarehouseTypeEnum[]
  }>
>

export type GetLocationListSuccessResponse = LocationListModel
