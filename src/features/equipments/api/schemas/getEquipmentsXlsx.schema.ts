import { LocationTypeEnum } from 'shared/catalogs/locations/api/constants'
import { Base64Type } from 'shared/types/common'

import { GetEquipmentsRequest } from './getEquipments.schema'

export type GetEquipmentsXlsxRequest = Omit<GetEquipmentsRequest, 'limit' | 'offset'> &
  Partial<{
    locationTypes: [LocationTypeEnum.Warehouse, LocationTypeEnum.ServiceCenter]
  }>

export type GetEquipmentsXlsxResponse = Base64Type
