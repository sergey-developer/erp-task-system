import { PaginatedListSuccessResponse } from 'shared/models'
import { PaginationParams } from 'shared/types/pagination'

import { NomenclatureListItemModel } from './nomenclatureList.model'

export type GetNomenclatureListQueryArgs = Partial<
  PaginationParams & {
    search: string
    group: number
  }
>

export type GetNomenclatureListSuccessResponse =
  PaginatedListSuccessResponse<NomenclatureListItemModel>
