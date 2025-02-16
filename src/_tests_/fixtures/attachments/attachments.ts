import { AttachmentDTO } from 'features/attachments/api/dto'
import times from 'lodash/times'

import { fakeId, fakeUrl, fakeWord } from '_tests_/helpers'

export const attachment = (): AttachmentDTO => ({
  id: fakeId(),
  name: fakeWord(),
  url: fakeUrl(),
  thumbnails: {
    smallThumbnail: fakeUrl(),
    mediumThumbnail: fakeUrl(),
  },
})

export const attachments = (length: number = 1) => times(length, () => attachment())
