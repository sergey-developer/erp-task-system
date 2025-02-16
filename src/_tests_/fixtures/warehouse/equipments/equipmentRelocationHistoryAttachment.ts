import { EquipmentRelocationHistoryAttachmentDTO } from 'features/equipments/api/dto'
import pick from 'lodash/pick'

import userFixtures from '_tests_/fixtures/users'
import { fakeDateString, fakeId, fakeInteger, fakeUrl, fakeWord } from '_tests_/helpers'

export const equipmentRelocationHistoryAttachment =
  (): EquipmentRelocationHistoryAttachmentDTO => ({
    id: fakeId(),
    url: fakeUrl(),
    name: fakeWord(),
    size: fakeInteger(),
    createdAt: fakeDateString(),
    createdBy: pick(userFixtures.userDetail(), 'id', 'firstName', 'lastName', 'middleName'),
  })
