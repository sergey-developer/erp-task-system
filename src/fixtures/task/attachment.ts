import { TaskAttachmentModel } from 'modules/task/models'

import { fakeIdStr, fakeInteger, fakeUrl, fakeWord } from '_tests_/utils'

export const fakeAttachment = (
  props?: Pick<TaskAttachmentModel, 'externalId'>,
): TaskAttachmentModel => ({
  externalId: props?.externalId === '' ? props.externalId : fakeIdStr(),

  url: fakeUrl(),
  name: fakeWord(),
  size: fakeInteger(),
})
