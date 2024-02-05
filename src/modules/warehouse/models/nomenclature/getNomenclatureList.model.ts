import { NomenclatureListItemModel } from 'modules/warehouse/models'

import { PaginatedListSuccessResponse } from 'shared/models/pagination.model'
import { FilterParams } from 'shared/types/filter'
import { PaginationParams } from 'shared/types/pagination'
import { MaybeUndefined } from 'shared/types/utils'

export type GetNomenclatureListQueryArgs = MaybeUndefined<
  Partial<
    PaginationParams &
      FilterParams & {
        group: number
        equipmentHasSerialNumber: boolean
      }
  >
>

export type GetNomenclatureListSuccessResponse =
  PaginatedListSuccessResponse<NomenclatureListItemModel>
