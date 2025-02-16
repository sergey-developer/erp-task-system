import { TaskAttachmentDTO } from 'features/tasks/api/dto'

import { fakeId, fakeIdStr, fakeInteger, fakeUrl, fakeWord } from '_tests_/utils'

export const attachment = (props?: Pick<TaskAttachmentDTO, 'externalId'>): TaskAttachmentDTO => ({
  externalId: props?.externalId === '' ? props.externalId : fakeIdStr(),

  id: fakeId(),
  url: fakeUrl(),
  name: fakeWord(),
  size: fakeInteger(),
})
