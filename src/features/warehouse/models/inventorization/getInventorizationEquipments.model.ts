import { InventorizationRequestArgs } from 'features/warehouse/types'

import { PaginationParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'
import { ExtendSortKey, SortParams } from 'shared/types/sort'

import { InventorizationEquipmentListItemModel } from './inventorizationEquipments.model'

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

export type GetInventorizationEquipmentsQueryArgs = InventorizationRequestArgs &
  PaginationParams &
  FilterParams &
  SortParams<GetInventorizationEquipmentsSortValue> &
  GetInventorizationEquipmentsFilter &
  Partial<{
    locationFact: IdType
    hasRelocationTask: boolean
  }>

export type GetInventorizationEquipmentsSuccessResponse =
  PaginationResponse<InventorizationEquipmentListItemModel>
