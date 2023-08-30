import {
  NomenclatureGroupListItemModel,
  GetNomenclatureGroupListQueryArgs,
} from 'modules/warehouse/models'

export type UpdateNomenclatureGroupMutationArgs = {
  id: number
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
