import { MaybeNull } from 'shared/types/utils'

import { NomenclatureDTO } from '../dto'

export type CreateNomenclatureRequest = {
  title: string
  shortTitle: string
  group: number
  vendorCode: string
  measurementUnit: number
  equipmentHasSerialNumber?: boolean
  country?: MaybeNull<number>
}

export type CreateNomenclatureResponse = Pick<NomenclatureDTO, 'id' | 'title' | 'vendorCode'>

export type CreateNomenclatureBadRequestResponse = Partial<CreateNomenclatureRequest>
