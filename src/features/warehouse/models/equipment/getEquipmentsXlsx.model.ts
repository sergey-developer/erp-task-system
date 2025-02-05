import { LocationTypeEnum } from 'shared/catalogs/constants'
import { Base64Type } from 'shared/types/common'

import { GetEquipmentListQueryArgs } from './getEquipments.model'

export type GetEquipmentsXlsxQueryArgs = Omit<GetEquipmentListQueryArgs, 'limit' | 'offset'> &
  Partial<{
    locationTypes: [LocationTypeEnum.Warehouse, LocationTypeEnum.ServiceCenter]
  }>

export type GetEquipmentsXlsxSuccessResponse = Base64Type
