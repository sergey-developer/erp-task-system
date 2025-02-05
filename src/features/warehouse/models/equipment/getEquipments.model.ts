import { EquipmentsFilterParams } from 'features/warehouse/types'

import { PaginationParams, PaginationResponse } from 'shared/api/schemas/pagination.schema'
import { LocationTypeEnum } from 'shared/catalogs/constants'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'
import { ExtendSortKey } from 'shared/types/sort'

import { EquipmentListItemModel } from './equipments.model'

export type GetEquipmentListSortKey =
  | 'title'
  | 'serial_number'
  | 'inventory_number'
  | 'location'
  | 'condition'
  | 'quantity'
  | 'category'
  | 'purpose'

export type GetEquipmentListSortValue = ExtendSortKey<GetEquipmentListSortKey>

export type GetEquipmentListQueryArgs = PaginationParams &
  EquipmentsFilterParams &
  FilterParams &
  Partial<{
    nomenclature: IdType
    ordering: GetEquipmentListSortValue
    locationTypes: [LocationTypeEnum.Warehouse, LocationTypeEnum.ServiceCenter]
  }>

export type GetEquipmentListSuccessResponse = PaginationResponse<EquipmentListItemModel>
