import { MaybeNull } from 'shared/types/utils'

import { NomenclatureListItemModel } from './nomenclatureList.model'

export type CreateNomenclatureMutationArgs = {
  title: string
  shortTitle: string
  group: number
  vendorCode: string
  measurementUnit: number
  country?: MaybeNull<number>
}

export type CreateNomenclatureSuccessResponse = Pick<
  NomenclatureListItemModel,
  'id' | 'title' | 'vendorCode'
>

export type CreateNomenclatureBadRequestErrorResponse =
  Partial<CreateNomenclatureMutationArgs>
