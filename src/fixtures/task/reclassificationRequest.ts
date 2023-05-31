import { TaskReclassificationRequestModel } from 'modules/task/models'

import commonFixtures from 'fixtures/common'
import taskFixtures from 'fixtures/task'

import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const getReclassificationRequest =
  (): TaskReclassificationRequestModel => ({
    id: fakeId(),
    createdAt: fakeDateString(),
    comment: {
      id: fakeId(),
      text: fakeWord(),
      author: commonFixtures.getCommentAuthor(),
      createdAt: fakeDateString(),
      attachments: [taskFixtures.fakeAttachment()],
    },
    user: commonFixtures.getUser(),
  })
