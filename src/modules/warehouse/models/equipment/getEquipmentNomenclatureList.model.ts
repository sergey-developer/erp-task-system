import { EquipmentNomenclatureListItemModel } from 'modules/warehouse/models'
import { EquipmentFilterParams } from 'modules/warehouse/types'

import { PaginatedListSuccessResponse } from 'shared/models/pagination.model'
import { PaginationParams } from 'shared/types/pagination'

export type GetEquipmentNomenclatureListQueryArgs = PaginationParams &
  EquipmentFilterParams &
  Partial<{ search: string }>

export type GetEquipmentNomenclatureListSuccessResponse =
  PaginatedListSuccessResponse<EquipmentNomenclatureListItemModel>
