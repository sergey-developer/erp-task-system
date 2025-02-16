import { RelocationEquipmentAttachmentDTO } from 'features/relocationEquipments/api/schemas'
import times from 'lodash/times'

import { fakeId, fakeUrl, fakeWord } from '_tests_/utils'

export const relocationEquipmentAttachment = (): RelocationEquipmentAttachmentDTO => ({
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
