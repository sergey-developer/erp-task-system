import { MaybeNull } from 'shared/types/utils'

import { NomenclatureListItemModel } from './nomenclatures.model'

export type CreateNomenclatureMutationArgs = {
  title: string
  shortTitle: string
  group: number
  vendorCode: string
  measurementUnit: number
  equipmentHasSerialNumber?: boolean
  country?: MaybeNull<number>
}

export type CreateNomenclatureSuccessResponse = Pick<
  NomenclatureListItemModel,
  'id' | 'title' | 'vendorCode'
>

export type CreateNomenclatureBadRequestErrorResponse = Partial<CreateNomenclatureMutationArgs>
