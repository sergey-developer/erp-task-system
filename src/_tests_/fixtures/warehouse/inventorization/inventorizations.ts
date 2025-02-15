import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'features/inventorizations/api/constants'
import { InventorizationDTO } from 'features/inventorizations/api/dto'
import pick from 'lodash/pick'
import times from 'lodash/times'

import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const inventorizationListItem = (): InventorizationDTO => ({
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
  revisionReason: fakeWord(),
})

export const inventorizations = (length: number = 1) =>
  times(length, () => inventorizationListItem())
