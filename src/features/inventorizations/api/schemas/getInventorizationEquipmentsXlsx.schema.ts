import { Base64Type } from 'shared/types/common'

import { RequestWithInventorization } from '../types'
import { GetInventorizationEquipmentsRequest } from './getInventorizationEquipments.schema'

export type GetInventorizationEquipmentsXlsxRequest = RequestWithInventorization &
  Omit<GetInventorizationEquipmentsRequest, 'offset' | 'limit'>

export type GetInventorizationEquipmentsXlsxResponse = Base64Type
