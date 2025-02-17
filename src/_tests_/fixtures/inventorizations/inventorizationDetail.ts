import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'features/inventorizations/api/constants'
import { InventorizationDetailDTO } from 'features/inventorizations/api/dto'
import pick from 'lodash/pick'

import userFixtures from '_tests_/fixtures/users'
import warehousesFixtures from '_tests_/fixtures/warehouses'
import { fakeDateString, fakeId, fakeInteger, fakeUrl, fakeWord } from '_tests_/helpers'

import nomenclaturesFixtures from '../nomenclatures'

export const inventorizationDetail = (
  props?: Partial<Pick<InventorizationDetailDTO, 'status' | 'executor'>>,
): InventorizationDetailDTO => ({
  status: props?.status || InventorizationStatusEnum.New,
  executor: props?.executor || pick(userFixtures.userDetail(), 'id', 'fullName'),

  id: fakeId(),
  warehouses: [
    pick(warehousesFixtures.warehouseDetail(), 'id', 'title'),
    pick(warehousesFixtures.warehouseDetail(), 'id', 'title'),
  ],
  createdAt: fakeDateString(),
  createdBy: pick(userFixtures.userDetail(), 'id', 'fullName'),
  type: InventorizationTypeEnum.Internal,
  deadlineAt: fakeDateString(),
  completedAt: fakeDateString(),
  nomenclatures: [pick(nomenclaturesFixtures.nomenclatureDetail(), 'id', 'title', 'group')],
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
