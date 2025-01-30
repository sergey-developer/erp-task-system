import { FilterParams } from 'shared/types/filter'
import { MaybeUndefined } from 'shared/types/utils'

import { NomenclatureGroupListModel } from './nomenclatureGroupList.model'

export type GetNomenclatureGroupListQueryArgs = MaybeUndefined<FilterParams>

export type GetNomenclatureGroupListSuccessResponse = NomenclatureGroupListModel
