import { ExtendedSortKey } from 'shared/interfaces/sort'

import { WarehouseListModel } from './warehouseList.model'

// todo: сделать также в других местах где есть сортировка
export type GetWarehouseListSortKey =
  | 'title'
  | 'legal_entity'
  | 'address'
  | 'parent'

export type GetWarehouseListSortValue = ExtendedSortKey<GetWarehouseListSortKey>

export type GetWarehouseListQueryArgs = {
  ordering?: GetWarehouseListSortValue
}

export type GetWarehouseListSuccessResponse = WarehouseListModel
