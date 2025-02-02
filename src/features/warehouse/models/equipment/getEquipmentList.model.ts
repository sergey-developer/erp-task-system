import { EquipmentsFilterParams } from 'features/warehouse/types'

import { LocationTypeEnum } from 'shared/catalogs/constants'
import { PaginationParams, PaginationResponse } from 'shared/dto/api/pagination.dto'
import { IdType } from 'shared/types/common'
import { FilterParams } from 'shared/types/filter'
import { ExtendSortKey } from 'shared/types/sort'

import { EquipmentListItemModel } from './equipmentList.model'

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
