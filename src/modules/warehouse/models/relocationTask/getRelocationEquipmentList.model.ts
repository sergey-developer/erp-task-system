import { RelocationEquipmentListItemModel } from 'modules/warehouse/models'
import { BaseRelocationTaskRequestArgs } from 'modules/warehouse/types'

import { PaginatedListSuccessResponse } from 'shared/models/pagination.model'
import { PaginationParams } from 'shared/types/pagination'

export type GetRelocationEquipmentListQueryArgs = BaseRelocationTaskRequestArgs & PaginationParams

export type GetRelocationEquipmentListSuccessResponse =
  PaginatedListSuccessResponse<RelocationEquipmentListItemModel>
