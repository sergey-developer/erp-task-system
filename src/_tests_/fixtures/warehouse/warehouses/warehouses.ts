import { WarehouseDTO, WarehousesDTO } from 'features/warehouses/api/dto'
import times from 'lodash/times'

import { fakeId, fakeWord } from '_tests_/utils'

export const warehouseListItem = (): WarehouseDTO => ({
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

export const warehouses = (length: number = 1): WarehousesDTO =>
  times(length, () => warehouseListItem())
