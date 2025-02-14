import { FilterParams } from 'shared/types/filter'
import { MaybeUndefined } from 'shared/types/utils'

import { NomenclatureGroupsModel } from './nomenclatureGroups.model'

export type GetNomenclatureGroupListRequest = MaybeUndefined<FilterParams>

export type GetNomenclatureGroupListResponse = NomenclatureGroupsModel
