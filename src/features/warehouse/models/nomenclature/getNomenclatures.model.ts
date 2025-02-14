import { NomenclatureListItemModel } from 'features/warehouse/models'

import { PaginationRequestParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { FilterParams } from 'shared/types/filter'
import { MaybeUndefined } from 'shared/types/utils'

export type GetNomenclatureListRequest = MaybeUndefined<
  PaginationRequestParams &
    FilterParams &
    Partial<{
      group: number
      equipmentHasSerialNumber: boolean
    }>
>

export type GetNomenclatureListResponse = PaginationResponse<NomenclatureListItemModel>
