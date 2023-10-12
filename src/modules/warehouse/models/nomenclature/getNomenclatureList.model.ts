import { PaginatedListSuccessResponse } from 'shared/models/pagination.model'
import { PaginationParams } from 'shared/types/pagination'
import { MaybeUndefined } from 'shared/types/utils'

import { NomenclatureListItemModel } from './nomenclatureList.model'

export type GetNomenclatureListQueryArgs = MaybeUndefined<
  Partial<
    PaginationParams & {
      search: string
      group: number
      equipmentHasSerialNumber: boolean
    }
  >
>

export type GetNomenclatureListSuccessResponse =
  PaginatedListSuccessResponse<NomenclatureListItemModel>
