import { EquipmentNomenclatureListItemModel } from 'modules/warehouse/models'
import { EquipmentsFilterParams } from 'modules/warehouse/types'

import { LocationTypeEnum } from 'shared/constants/catalogs'
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
