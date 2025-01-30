import {
  NomenclatureGroupListItemModel,
  GetNomenclatureGroupListQueryArgs,
} from 'features/warehouse/models'

export type CreateNomenclatureGroupMutationArgs = {
  title: string
  getListParams: GetNomenclatureGroupListQueryArgs
}

export type CreateNomenclatureGroupSuccessResponse = Pick<
  NomenclatureGroupListItemModel,
  'id' | 'title'
>

export type CreateNomenclatureGroupBadRequestErrorResponse = Partial<
  Omit<CreateNomenclatureGroupMutationArgs, 'getListParams'>
>
