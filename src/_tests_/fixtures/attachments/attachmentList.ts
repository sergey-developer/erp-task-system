import times from 'lodash/times'

import { AttachmentListItemModel } from 'features/attachment/models'

import { fakeId, fakeUrl, fakeWord } from '_tests_/utils'

export const attachmentListItem = (): AttachmentListItemModel => ({
  id: fakeId(),
  name: fakeWord(),
  url: fakeUrl(),
  thumbnails: {
    smallThumbnail: fakeUrl(),
    mediumThumbnail: fakeUrl(),
  },
})

export const attachmentList = (length: number = 1) => times(length, () => attachmentListItem())
