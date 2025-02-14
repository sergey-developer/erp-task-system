import { PaginationRequestParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { LocationTypeEnum } from 'shared/catalogs/locations/api/constants'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'
import { ExtendSortKey } from 'shared/types/sort'

import { EquipmentDTO } from '../dto'
import { EquipmentsFilterParams } from '../types'

export type GetEquipmentsSortKey =
  | 'title'
  | 'serial_number'
  | 'inventory_number'
  | 'location'
  | 'condition'
  | 'quantity'
  | 'category'
  | 'purpose'

export type GetEquipmentsSortValue = ExtendSortKey<GetEquipmentsSortKey>

export type GetEquipmentsRequest = PaginationRequestParams &
  EquipmentsFilterParams &
  FilterParams &
  Partial<{
    nomenclature: IdType
    ordering: GetEquipmentsSortValue
    locationTypes: [LocationTypeEnum.Warehouse, LocationTypeEnum.ServiceCenter]
  }>

export type GetEquipmentsResponse = PaginationResponse<EquipmentDTO>
