import { WarehouseModel } from './warehouse.model'

export type WarehouseListItemModel = Pick<
  WarehouseModel,
  'id' | 'title' | 'parent' | 'legalEntity' | 'address'
>

export type WarehouseListModel = WarehouseListItemModel[]
