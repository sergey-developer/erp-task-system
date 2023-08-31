import times from 'lodash/times'

import {
  WarehouseListItemModel,
  WarehouseListModel,
} from 'modules/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const warehouseListItem = (): WarehouseListItemModel => ({
  id: fakeId(),
  address: fakeWord(),
  title: fakeWord(),
  parent: {
    id: fakeId(),
    title: fakeWord(),
  },
  legalEntity: {
    id: fakeId(),
    title: fakeWord(),
  },
})

export const warehouseList = (length: number = 1): WarehouseListModel =>
  times(length, () => warehouseListItem())
