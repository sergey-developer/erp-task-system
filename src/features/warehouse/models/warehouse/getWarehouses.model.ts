import { IdType } from 'shared/types/common'
import { ExtendSortKey, SortParams } from 'shared/types/sort'
import { MaybeUndefined } from 'shared/types/utils'

import { WarehousesModel } from './warehouses.model'

export type GetWarehouseListSortKey = 'title' | 'legal_entity' | 'address' | 'parent'

export type GetWarehouseListSortValue = ExtendSortKey<GetWarehouseListSortKey>

export type GetWarehouseListRequest = MaybeUndefined<
  SortParams<GetWarehouseListSortValue> &
    Partial<{
      title: string
      address: string
      legalEntity: IdType
      parent: IdType
    }>
>

export type GetWarehouseListResponse = WarehousesModel
