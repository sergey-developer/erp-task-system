import { EquipmentRelocationHistoryAttachmentDTO } from 'features/warehouses/api/dto'
import pick from 'lodash/pick'

import userFixtures from '_tests_/fixtures/users'
import { fakeDateString, fakeId, fakeInteger, fakeUrl, fakeWord } from '_tests_/utils'

export const equipmentRelocationHistoryAttachment =
  (): EquipmentRelocationHistoryAttachmentDTO => ({
    id: fakeId(),
    url: fakeUrl(),
    name: fakeWord(),
    size: fakeInteger(),
    createdAt: fakeDateString(),
    createdBy: pick(userFixtures.user(), 'id', 'firstName', 'lastName', 'middleName'),
  })
