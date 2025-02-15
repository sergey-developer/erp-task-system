import { IdType } from 'shared/types/common'
import { ExtendSortKey, SortParams } from 'shared/types/sort'
import { MaybeUndefined } from 'shared/types/utils'

import { WarehousesDTO } from '../dto'

export type GetWarehousesSortKey = 'title' | 'legal_entity' | 'address' | 'parent'

export type GetWarehousesSortValue = ExtendSortKey<GetWarehousesSortKey>

export type GetWarehousesRequest = MaybeUndefined<
  SortParams<GetWarehousesSortValue> &
    Partial<{
      title: string
      address: string
      legalEntity: IdType
      parent: IdType
    }>
>

export type GetWarehousesResponse = WarehousesDTO
