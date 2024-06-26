import { WarehouseTypeEnum } from 'modules/warehouse/constants/warehouse'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import { LocationsModel } from 'shared/models/catalogs/location'
import { ExtendSortKey } from 'shared/types/sort'

export type GetLocationsSortKey = 'title'

export type GetLocationsSortValue = ExtendSortKey<GetLocationsSortKey>

export type GetLocationsQueryArgs = Partial<{
  locationTypes: LocationTypeEnum[]
  warehouseTypes: WarehouseTypeEnum[]
  ordering: GetLocationsSortValue
  responsibilityArea: boolean
}>

export type GetLocationsSuccessResponse = LocationsModel
