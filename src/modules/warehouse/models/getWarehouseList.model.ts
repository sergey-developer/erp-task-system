import { IdType } from 'shared/types/common'
import { ExtendSortKey } from 'shared/types/sort'
import { MaybeUndefined } from 'shared/types/utils'

import { WarehouseListModel } from './warehouseList.model'

// todo: сделать также в других местах где есть сортировка
export type GetWarehouseListSortKey = 'title' | 'legal_entity' | 'address' | 'parent'

export type GetWarehouseListSortValue = ExtendSortKey<GetWarehouseListSortKey>

export type GetWarehouseListQueryArgs = MaybeUndefined<
  Partial<{
    title: string
    address: string
    legalEntity: IdType
    parent: IdType
    ordering: GetWarehouseListSortValue
  }>
>

export type GetWarehouseListSuccessResponse = WarehouseListModel
