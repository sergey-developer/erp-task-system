import { RelocationEquipmentAttachmentDTO } from 'features/relocationEquipments/api/dto'
import times from 'lodash/times'

import { fakeId, fakeUrl, fakeWord } from '_tests_/helpers'

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
