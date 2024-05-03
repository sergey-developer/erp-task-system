import pick from 'lodash/pick'

import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'modules/warehouse/constants/inventorization'
import { InventorizationModel } from 'modules/warehouse/models'

import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const inventorization = (): InventorizationModel => ({
  id: fakeId(),
  warehouses: [
    pick(warehouseFixtures.warehouse(), 'id', 'title'),
    pick(warehouseFixtures.warehouse(), 'id', 'title'),
  ],
  createdAt: fakeDateString(),
  createdBy: pick(userFixtures.user(), 'id', 'fullName'),
  status: InventorizationStatusEnum.New,
  type: InventorizationTypeEnum.Internal,
  executor: pick(userFixtures.user(), 'id', 'fullName'),
  deadlineAt: fakeDateString(),
  completedAt: fakeDateString(),
  nomenclatures: [
    { id: fakeId(), title: fakeWord(), nomenclaturesGroup: { id: fakeId(), title: fakeWord() } },
  ],
})
