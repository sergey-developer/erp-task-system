import { ExtendedSortKey } from 'shared/interfaces/sort'
import { MaybeUndefined } from 'shared/interfaces/utils'

import { WarehouseListModel } from './warehouseList.model'

// todo: сделать также в других местах где есть сортировка
export type GetWarehouseListSortKey =
  | 'title'
  | 'legal_entity'
  | 'address'
  | 'parent'

export type GetWarehouseListSortValue = ExtendedSortKey<GetWarehouseListSortKey>

export type GetWarehouseListQueryArgs = MaybeUndefined<
  Partial<{
    title: string
    address: string
    legalEntity: number
    parent: number
    ordering: GetWarehouseListSortValue
  }>
>

export type GetWarehouseListSuccessResponse = WarehouseListModel
