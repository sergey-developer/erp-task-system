import { TaskReclassificationRequestModel } from 'modules/task/models'

import commonFixtures from '_tests_/fixtures/common'
import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const reclassificationRequest = (): TaskReclassificationRequestModel => ({
  id: fakeId(),
  createdAt: fakeDateString(),
  comment: {
    id: fakeId(),
    text: fakeWord(),
    author: commonFixtures.commentAuthor(),
    createdAt: fakeDateString(),
    attachments: [taskFixtures.attachment()],
  },
  user: userFixtures.baseUser(),
})
