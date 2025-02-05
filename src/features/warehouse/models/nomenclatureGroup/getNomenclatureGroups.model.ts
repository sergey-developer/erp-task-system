import { FilterParams } from 'shared/types/filter'
import { MaybeUndefined } from 'shared/types/utils'

import { NomenclatureGroupsModel } from './nomenclatureGroups.model'

export type GetNomenclatureGroupListQueryArgs = MaybeUndefined<FilterParams>

export type GetNomenclatureGroupListSuccessResponse = NomenclatureGroupsModel
