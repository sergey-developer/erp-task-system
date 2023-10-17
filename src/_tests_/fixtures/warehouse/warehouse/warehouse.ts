import { WarehouseModel } from 'modules/warehouse/models'

import { fakeId, fakeWord } from '_tests_/utils'

export const warehouse = (
  props?: Partial<Pick<WarehouseModel, 'id'>>,
): WarehouseModel => ({
  id: props?.id || fakeId(),

  title: fakeWord(),
  address: fakeWord(),
  contract: fakeWord(),
  notes: fakeWord(),
  parent: {
    id: fakeId(),
    title: fakeWord(),
  },
  legalEntity: {
    id: fakeId(),
    title: fakeWord(),
  },
})
