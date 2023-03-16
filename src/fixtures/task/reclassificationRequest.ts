import { TaskReclassificationRequestModel } from 'modules/task/models'

import commonFixtures from 'fixtures/common'

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
    },
    user: commonFixtures.getUser(),
  })
