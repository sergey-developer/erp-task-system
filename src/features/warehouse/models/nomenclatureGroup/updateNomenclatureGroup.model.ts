import {
  NomenclatureGroupListItemModel,
  GetNomenclatureGroupListRequest,
} from 'features/warehouse/models'

import { IdType } from 'shared/types/common'

export type UpdateNomenclatureGroupRequest = {
  id: IdType
  title: string
  getListParams: GetNomenclatureGroupListRequest
}

export type UpdateNomenclatureGroupResponse = Pick<NomenclatureGroupListItemModel, 'id' | 'title'>

export type UpdateNomenclatureGroupBadRequestErrorResponse = Partial<
  Omit<UpdateNomenclatureGroupRequest, 'getListParams' | 'id'>
>
