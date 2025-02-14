import { InventorizationRequestArgs } from 'features/warehouse/types'

import { Base64Type } from 'shared/types/common'

import { GetInventorizationEquipmentsRequest } from './getInventorizationEquipments.model'

export type GetInventorizationEquipmentsXlsxRequest = InventorizationRequestArgs &
  Omit<GetInventorizationEquipmentsRequest, 'offset' | 'limit'>

export type GetInventorizationEquipmentsXlsxResponse = Base64Type
