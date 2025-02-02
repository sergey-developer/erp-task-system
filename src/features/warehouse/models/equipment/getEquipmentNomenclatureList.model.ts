import { EquipmentNomenclatureListItemModel } from 'features/warehouse/models'
import { EquipmentsFilterParams } from 'features/warehouse/types'

import { LocationTypeEnum } from 'shared/catalogs/constants'
import { PaginationParams, PaginationResponse } from 'shared/dto/api/pagination.dto'
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
