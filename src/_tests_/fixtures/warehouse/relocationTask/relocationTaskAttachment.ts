import { RelocationTaskAttachmentDetailDTO } from 'features/warehouse/models'

import { fakeDateString, fakeId, fakeInteger, fakeName, fakeUrl, fakeWord } from '_tests_/utils'

export const relocationTaskAttachment = (): RelocationTaskAttachmentDetailDTO => ({
  id: fakeId(),
  url: fakeUrl(),
  name: fakeWord(),
  size: fakeInteger(),
  createdAt: fakeDateString(),
  firstName: fakeName(),
  lastName: fakeName(),
  middleName: fakeName(),
})
