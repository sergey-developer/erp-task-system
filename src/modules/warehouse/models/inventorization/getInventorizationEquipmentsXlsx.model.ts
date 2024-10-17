import { InventorizationRequestArgs } from 'modules/warehouse/types'

import { Base64Type } from 'shared/types/common'

import { GetInventorizationEquipmentsQueryArgs } from './getInventorizationEquipments.model'

export type GetInventorizationEquipmentsXlsxQueryArgs = InventorizationRequestArgs &
  Omit<GetInventorizationEquipmentsQueryArgs, 'offset' | 'limit'>

export type GetInventorizationEquipmentsXlsxSuccessResponse = Base64Type
