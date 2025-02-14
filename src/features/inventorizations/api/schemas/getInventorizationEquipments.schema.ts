import { PaginationRequestParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'
import { ExtendSortKey, SortParams } from 'shared/types/sort'

import { InventorizationEquipmentDTO } from '../dto'
import { RequestWithInventorization } from '../types'

export type GetInventorizationEquipmentsSortKey =
  | 'title'
  | 'serial_number'
  | 'inventory_number'
  | 'location_plan'
  | 'location_fact'
  | 'quantity_plan'
  | 'quantity_fact'
  | 'diff'

export type GetInventorizationEquipmentsSortValue =
  ExtendSortKey<GetInventorizationEquipmentsSortKey>

export type GetInventorizationEquipmentsFilter = Partial<{
  isFilled: boolean
  hasDiff: boolean
  locationPlan: IdType
}>

export type GetInventorizationEquipmentsRequest = RequestWithInventorization &
  PaginationRequestParams &
  FilterParams &
  SortParams<GetInventorizationEquipmentsSortValue> &
  GetInventorizationEquipmentsFilter &
  Partial<{
    locationFact: IdType
    hasRelocationTask: boolean
  }>

export type GetInventorizationEquipmentsResponse = PaginationResponse<InventorizationEquipmentDTO>
