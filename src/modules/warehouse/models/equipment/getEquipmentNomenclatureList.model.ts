import { EquipmentNomenclatureListItemModel } from 'modules/warehouse/models'
import { EquipmentFilterParams } from 'modules/warehouse/types'

import { PaginatedListSuccessResponse } from 'shared/models/pagination.model'
import { FilterParams } from 'shared/types/filter'
import { PaginationParams } from 'shared/types/pagination'

export type GetEquipmentNomenclatureListQueryArgs = PaginationParams &
  EquipmentFilterParams &
  Partial<FilterParams>

export type GetEquipmentNomenclatureListSuccessResponse =
  PaginatedListSuccessResponse<EquipmentNomenclatureListItemModel>
