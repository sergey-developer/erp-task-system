import { TaskAttachmentModel } from 'features/task/models'

import { fakeId, fakeIdStr, fakeInteger, fakeUrl, fakeWord } from '_tests_/utils'

export const attachment = (
  props?: Pick<TaskAttachmentModel, 'externalId'>,
): TaskAttachmentModel => ({
  externalId: props?.externalId === '' ? props.externalId : fakeIdStr(),

  id: fakeId(),
  url: fakeUrl(),
  name: fakeWord(),
  size: fakeInteger(),
})
