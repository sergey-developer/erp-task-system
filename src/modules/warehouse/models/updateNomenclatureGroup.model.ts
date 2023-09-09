import {
  NomenclatureGroupListItemModel,
  GetNomenclatureGroupListQueryArgs,
} from 'modules/warehouse/models'

import { IdType } from 'shared/types/common'

export type UpdateNomenclatureGroupMutationArgs = {
  id: IdType
  title: string
  getListParams: GetNomenclatureGroupListQueryArgs
}

export type UpdateNomenclatureGroupSuccessResponse = Pick<
  NomenclatureGroupListItemModel,
  'id' | 'title'
>

export type UpdateNomenclatureGroupBadRequestErrorResponse = Partial<
  Omit<UpdateNomenclatureGroupMutationArgs, 'getListParams' | 'id'>
>
