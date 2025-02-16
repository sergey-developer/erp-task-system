import { RelocationTaskAttachmentDetailDTO } from 'features/relocationTasks/api/dto'

import { fakeDateString, fakeId, fakeInteger, fakeName, fakeUrl, fakeWord } from '_tests_/helpers'

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
