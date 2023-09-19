import { MaybeUndefined } from 'shared/types/utils'

import { NomenclatureGroupListModel } from './nomenclatureGroupList.model'

export type GetNomenclatureGroupListQueryArgs = MaybeUndefined<
  Partial<{
    search: string
  }>
>

export type GetNomenclatureGroupListSuccessResponse = NomenclatureGroupListModel
