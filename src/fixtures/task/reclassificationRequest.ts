import { TaskReclassificationRequestModel } from 'modules/task/models'

import commonFixtures from 'fixtures/common'
import taskFixtures from 'fixtures/task'

import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const reclassificationRequest =
  (): TaskReclassificationRequestModel => ({
    id: fakeId(),
    createdAt: fakeDateString(),
    comment: {
      id: fakeId(),
      text: fakeWord(),
      author: commonFixtures.commentAuthor(),
      createdAt: fakeDateString(),
      attachments: [taskFixtures.attachment()],
    },
    user: commonFixtures.baseUser(),
  })
