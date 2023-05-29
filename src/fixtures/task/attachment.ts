import { TaskAttachmentModel } from 'modules/task/models'

import { fakeIdStr, fakeInteger, fakeUrl, fakeWord } from '_tests_/utils'

export const fakeAttachment = (): TaskAttachmentModel => ({
  name: fakeWord(),
  size: fakeInteger(),
  url: fakeUrl(),
  externalId: fakeIdStr(),
})
