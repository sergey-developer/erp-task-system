import { InventorizationRequestArgs } from 'modules/warehouse/types'

import { PaginationResponse } from 'shared/models/pagination.model'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'
import { PaginationParams } from 'shared/types/pagination'
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
