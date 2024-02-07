import { EquipmentNomenclatureListItemModel } from 'modules/warehouse/models'
import { EquipmentFilterParams } from 'modules/warehouse/types'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import { PaginationResponse } from 'shared/models/pagination.model'
import { FilterParams } from 'shared/types/filter'
import { PaginationParams } from 'shared/types/pagination'

export type GetEquipmentNomenclatureListQueryArgs = PaginationParams &
  EquipmentFilterParams &
  FilterParams & {
    locationTypes: [LocationTypeEnum.Warehouse, LocationTypeEnum.ServiceCenter]
  }

export type GetEquipmentNomenclatureListSuccessResponse =
  PaginationResponse<EquipmentNomenclatureListItemModel>
