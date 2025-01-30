import { EquipmentNomenclatureListItemModel } from 'features/warehouse/models'
import { EquipmentsFilterParams } from 'features/warehouse/types'

import { LocationTypeEnum } from 'shared/catalogs/constants'
import { PaginationResponse } from 'shared/models/pagination.model'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'
import { PaginationParams } from 'shared/types/pagination'

export type GetEquipmentNomenclaturesQueryArgs = PaginationParams &
  EquipmentsFilterParams &
  FilterParams &
  Partial<{
    warehouses: IdType[]
    locationTypes: [LocationTypeEnum.Warehouse, LocationTypeEnum.ServiceCenter]
  }>

export type GetEquipmentNomenclaturesSuccessResponse =
  PaginationResponse<EquipmentNomenclatureListItemModel>
