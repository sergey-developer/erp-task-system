import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'features/inventorizations/api/constants'
import { InventorizationDTO } from 'features/inventorizations/api/dto'
import pick from 'lodash/pick'
import times from 'lodash/times'

import userFixtures from '_tests_/fixtures/users'
import warehousesFixtures from '_tests_/fixtures/warehouse'
import { fakeDateString, fakeId, fakeWord } from '_tests_/helpers'

export const inventorizationListItem = (): InventorizationDTO => ({
  id: fakeId(),
  warehouses: [
    pick(warehousesFixtures.warehouse(), 'id', 'title'),
    pick(warehousesFixtures.warehouse(), 'id', 'title'),
  ],
  createdAt: fakeDateString(),
  createdBy: pick(userFixtures.userDetail(), 'id', 'fullName'),
  status: InventorizationStatusEnum.New,
  type: InventorizationTypeEnum.Internal,
  executor: pick(userFixtures.userDetail(), 'id', 'fullName'),
  deadlineAt: fakeDateString(),
  completedAt: fakeDateString(),
  revisionReason: fakeWord(),
})

export const inventorizations = (length: number = 1) =>
  times(length, () => inventorizationListItem())
