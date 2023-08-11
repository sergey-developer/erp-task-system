import {
  GetNomenclatureListQueryArgs,
  NomenclatureListItemModel,
} from 'modules/warehouse/models'

export type UpdateNomenclatureMutationArgs = {
  id: number
  title: string
  shortTitle: string
  group: number
  vendorCode: string
  measurementUnit: number
  country?: number
  getListParams: GetNomenclatureListQueryArgs
}

export type UpdateNomenclatureSuccessResponse = Pick<
  NomenclatureListItemModel,
  'id' | 'title' | 'vendorCode'
>

export type UpdateNomenclatureBadRequestErrorResponse = Partial<
  Omit<UpdateNomenclatureMutationArgs, 'getListParams' | 'id'>
>
