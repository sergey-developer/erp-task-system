import { WarehouseTypeEnum } from 'features/warehouse/constants/warehouse'

import { LocationTypeEnum } from 'shared/catalogs/constants'
import { LocationsCatalogDTO } from 'shared/catalogs/locations/api/dto'
import { IdType } from 'shared/types/common'
import { ExtendSortKey } from 'shared/types/sort'

export type GetLocationsCatalogSortKey = 'title'

export type GetLocationsCatalogSortValue = ExtendSortKey<GetLocationsCatalogSortKey>

export type GetLocationsCatalogQueryArgs = Partial<{
  locationTypes: LocationTypeEnum[]
  warehouseTypes: WarehouseTypeEnum[]
  ordering: GetLocationsCatalogSortValue
  responsibilityArea: boolean
  inventorization: IdType
}>

export type GetLocationsCatalogSuccessResponse = LocationsCatalogDTO
