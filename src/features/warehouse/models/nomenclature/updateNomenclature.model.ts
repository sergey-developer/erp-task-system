import { GetNomenclatureListQueryArgs, NomenclatureListItemModel } from 'features/warehouse/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type UpdateNomenclatureMutationArgs = {
  id: IdType
  title: string
  shortTitle: string
  group: number
  vendorCode: string
  measurementUnit: number
  country?: MaybeNull<number>
  getListParams: GetNomenclatureListQueryArgs
}

export type UpdateNomenclatureSuccessResponse = Pick<
  NomenclatureListItemModel,
  'id' | 'title' | 'vendorCode'
>

export type UpdateNomenclatureBadRequestErrorResponse = Partial<
  Omit<UpdateNomenclatureMutationArgs, 'getListParams' | 'id'>
>
