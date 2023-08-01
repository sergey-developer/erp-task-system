import { MaybeNull } from 'shared/types/utils'

export type WarehouseListItemModel = {
  id: number
  title: string
  parent: MaybeNull<{
    id: number
    title: string
  }>
  legalEntity: {
    id: number
    title: string
  }
  address: string
}

export type WarehouseListModel = Array<WarehouseListItemModel>
