import { NomenclatureListItemModel } from 'features/warehouse/models'

import { PaginationParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { FilterParams } from 'shared/types/filter'
import { MaybeUndefined } from 'shared/types/utils'

export type GetNomenclatureListQueryArgs = MaybeUndefined<
  PaginationParams &
    FilterParams &
    Partial<{
      group: number
      equipmentHasSerialNumber: boolean
    }>
>

export type GetNomenclatureListSuccessResponse = PaginationResponse<NomenclatureListItemModel>
