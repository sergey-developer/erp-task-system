import { LocationTypeEnum } from 'shared/constants/catalogs'

import { GetEquipmentListQueryArgs } from './getEquipmentList.model'

export type GetEquipmentsXlsxQueryArgs = Omit<GetEquipmentListQueryArgs, 'limit' | 'offset'> &
  Partial<{
    locationTypes: [LocationTypeEnum.Warehouse, LocationTypeEnum.ServiceCenter]
  }>

export type GetEquipmentsXlsxSuccessResponse = string
