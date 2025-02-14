import { GetNomenclatureListRequest, NomenclatureListItemModel } from 'features/warehouse/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type UpdateNomenclatureRequest = {
  id: IdType
  title: string
  shortTitle: string
  group: number
  vendorCode: string
  measurementUnit: number
  country?: MaybeNull<number>
  getListParams: GetNomenclatureListRequest
}

export type UpdateNomenclatureResponse = Pick<
  NomenclatureListItemModel,
  'id' | 'title' | 'vendorCode'
>

export type UpdateNomenclatureBadRequestErrorResponse = Partial<
  Omit<UpdateNomenclatureRequest, 'getListParams' | 'id'>
>
