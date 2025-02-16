import { AttachmentDTO } from 'features/attachments/api/dto'
import times from 'lodash/times'

import { fakeId, fakeUrl, fakeWord } from '_tests_/utils'

export const attachmentListItem = (): AttachmentDTO => ({
  id: fakeId(),
  name: fakeWord(),
  url: fakeUrl(),
  thumbnails: {
    smallThumbnail: fakeUrl(),
    mediumThumbnail: fakeUrl(),
  },
})

export const attachments = (length: number = 1) => times(length, () => attachmentListItem())
