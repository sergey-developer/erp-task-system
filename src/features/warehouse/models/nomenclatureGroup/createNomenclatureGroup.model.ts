import {
  NomenclatureGroupListItemModel,
  GetNomenclatureGroupListRequest,
} from 'features/warehouse/models'

export type CreateNomenclatureGroupRequest = {
  title: string
  getListParams: GetNomenclatureGroupListRequest
}

export type CreateNomenclatureGroupResponse = Pick<NomenclatureGroupListItemModel, 'id' | 'title'>

export type CreateNomenclatureGroupBadRequestErrorResponse = Partial<
  Omit<CreateNomenclatureGroupRequest, 'getListParams'>
>
