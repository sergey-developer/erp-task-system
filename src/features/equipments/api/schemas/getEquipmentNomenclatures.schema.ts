import { PaginationRequestParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { LocationTypeEnum } from 'shared/catalogs/locations/api/constants'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'

import { EquipmentNomenclatureDTO } from '../dto'
import { EquipmentsFilterRequestParams } from '../types'

export type GetEquipmentNomenclaturesRequest = PaginationRequestParams &
  EquipmentsFilterRequestParams &
  FilterParams &
  Partial<{
    warehouses: IdType[]
    locationTypes: [LocationTypeEnum.Warehouse, LocationTypeEnum.ServiceCenter]
  }>

export type GetEquipmentNomenclaturesResponse = PaginationResponse<EquipmentNomenclatureDTO>
