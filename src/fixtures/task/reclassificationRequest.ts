import { TaskReclassificationRequestModel } from 'modules/task/models'

import commonFixtures from 'fixtures/common'

import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const fakeReclassificationRequest =
  (): TaskReclassificationRequestModel => ({
    id: fakeId(),
    createdAt: fakeDateString(),
    comment: {
      id: fakeId(),
      text: fakeWord(),
      author: commonFixtures.fakeCommentAuthor(),
      createdAt: fakeDateString(),
    },
    user: commonFixtures.fakeUser(),
  })
