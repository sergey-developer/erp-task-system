import { EquipmentNomenclatureListItemModel } from 'features/warehouse/models'
import { EquipmentsFilterParams } from 'features/warehouse/types'

import { PaginationParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { LocationTypeEnum } from 'shared/catalogs/constants'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'

export type GetEquipmentNomenclaturesQueryArgs = PaginationParams &
  EquipmentsFilterParams &
  FilterParams &
  Partial<{
    warehouses: IdType[]
    locationTypes: [LocationTypeEnum.Warehouse, LocationTypeEnum.ServiceCenter]
  }>

export type GetEquipmentNomenclaturesSuccessResponse =
  PaginationResponse<EquipmentNomenclatureListItemModel>
