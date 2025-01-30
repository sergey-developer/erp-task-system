import times from 'lodash/times'

import { RelocationEquipmentAttachmentListItemModel } from 'features/warehouse/models/relocationEquipment'

import { fakeId, fakeUrl, fakeWord } from '_tests_/utils'

export const relocationEquipmentAttachment = (): RelocationEquipmentAttachmentListItemModel => ({
  id: fakeId(),
  url: fakeUrl(),
  name: fakeWord(),
  thumbnails: {
    smallThumbnail: fakeUrl(),
    mediumThumbnail: fakeUrl(),
  },
})

export const relocationEquipmentAttachments = (length: number = 1) =>
  times(length, () => relocationEquipmentAttachment())
