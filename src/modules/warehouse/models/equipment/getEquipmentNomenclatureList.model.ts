import { PaginatedListSuccessResponse } from 'shared/models'
import { PaginationParams } from 'shared/types/pagination'

import { EquipmentNomenclatureListItemModel } from './equipmentNomenclatureList.model'

export type GetEquipmentNomenclatureListQueryArgs = PaginationParams & Partial<{
  search: string
}>

export type GetEquipmentNomenclatureListSuccessResponse =
  PaginatedListSuccessResponse<EquipmentNomenclatureListItemModel>
