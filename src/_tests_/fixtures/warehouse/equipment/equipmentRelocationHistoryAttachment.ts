import pick from 'lodash/pick'

import { EquipmentRelocationHistoryAttachmentModel } from 'features/warehouse/models'

import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeId, fakeInteger, fakeUrl, fakeWord } from '_tests_/utils'

export const equipmentRelocationHistoryAttachment =
  (): EquipmentRelocationHistoryAttachmentModel => ({
    id: fakeId(),
    url: fakeUrl(),
    name: fakeWord(),
    size: fakeInteger(),
    createdAt: fakeDateString(),
    createdBy: pick(userFixtures.user(), 'id', 'firstName', 'lastName', 'middleName'),
  })
