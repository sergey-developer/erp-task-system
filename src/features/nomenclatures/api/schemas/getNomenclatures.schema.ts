import { PaginationRequestParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { FilterParams } from 'shared/types/filter'
import { MaybeUndefined } from 'shared/types/utils'

import { NomenclatureDTO } from '../dto'

export type GetNomenclaturesRequest = MaybeUndefined<
  PaginationRequestParams &
    FilterParams &
    Partial<{
      group: number
      equipmentHasSerialNumber: boolean
    }>
>

export type GetNomenclaturesResponse = PaginationResponse<NomenclatureDTO>
