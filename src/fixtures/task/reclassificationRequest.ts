import { TaskReclassificationRequestModel } from 'modules/task/models'

import commonFixtures from 'fixtures/common'

import { generateDateString, generateId, generateWord } from '_tests_/utils'

export const getReclassificationRequest =
  (): TaskReclassificationRequestModel => ({
    id: generateId(),
    createdAt: generateDateString(),
    comment: {
      id: generateId(),
      text: generateWord(),
      author: commonFixtures.getCommentAuthor(),
      createdAt: generateDateString(),
    },
    user: commonFixtures.getUser(),
  })
