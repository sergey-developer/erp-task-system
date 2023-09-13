import { GetNomenclatureGroupListQueryArgs } from './getNomenclatureGroupList.model'
import { NomenclatureGroupListItemModel } from './nomenclatureGroupList.model'

export type CreateNomenclatureGroupMutationArgs = {
  title: string
  getListParams: GetNomenclatureGroupListQueryArgs
}

export type CreateNomenclatureGroupSuccessResponse = Pick<
  NomenclatureGroupListItemModel,
  'id' | 'title'
>

export type CreateNomenclatureGroupBadRequestErrorResponse =
  Partial<CreateNomenclatureGroupMutationArgs>
