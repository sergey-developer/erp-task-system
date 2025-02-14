import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { NomenclatureDTO } from '../dto'
import { GetNomenclaturesRequest } from './getNomenclatures.schema'

export type UpdateNomenclatureRequest = {
  id: IdType
  title: string
  shortTitle: string
  group: number
  vendorCode: string
  measurementUnit: number
  country?: MaybeNull<number>
  getListParams: GetNomenclaturesRequest
}

export type UpdateNomenclatureResponse = Pick<NomenclatureDTO, 'id' | 'title' | 'vendorCode'>

export type UpdateNomenclatureBadRequestResponse = Partial<
  Omit<UpdateNomenclatureRequest, 'getListParams' | 'id'>
>
