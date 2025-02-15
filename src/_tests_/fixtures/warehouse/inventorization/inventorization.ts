import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'features/inventorizations/api/constants'
import { InventorizationDetailDTO } from 'features/inventorizations/api/dto'
import pick from 'lodash/pick'

import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { fakeDateString, fakeId, fakeInteger, fakeUrl, fakeWord } from '_tests_/utils'

export const inventorization = (
  props?: Partial<Pick<InventorizationDetailDTO, 'status' | 'executor'>>,
): InventorizationDetailDTO => ({
  status: props?.status || InventorizationStatusEnum.New,
  executor: props?.executor || pick(userFixtures.user(), 'id', 'fullName'),

  id: fakeId(),
  warehouses: [
    pick(warehouseFixtures.warehouse(), 'id', 'title'),
    pick(warehouseFixtures.warehouse(), 'id', 'title'),
  ],
  createdAt: fakeDateString(),
  createdBy: pick(userFixtures.user(), 'id', 'fullName'),
  type: InventorizationTypeEnum.Internal,
  deadlineAt: fakeDateString(),
  completedAt: fakeDateString(),
  nomenclatures: [pick(warehouseFixtures.nomenclature(), 'id', 'title', 'group')],
  description: fakeWord(),

  // todo: использовать фикстуру когда она будет готова
  attachments: [
    {
      id: fakeId(),
      name: fakeWord(),
      url: fakeUrl(),
      size: fakeInteger(),
    },
  ],
})
