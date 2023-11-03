import { WarehouseTypeEnum } from 'modules/warehouse/constants/warehouse'

import { LocationTypeEnum } from 'shared/constants/catalogs'

import { LocationListModel } from './locationList.model'

export type GetLocationListQueryArgs = Partial<{
  locationTypes: LocationTypeEnum[]
  warehouseTypes: WarehouseTypeEnum[]
}>

export type GetLocationListSuccessResponse = LocationListModel
