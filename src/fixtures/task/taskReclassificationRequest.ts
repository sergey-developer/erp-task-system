import { generateDateString, generateId, generateWord } from '_tests_/utils'
import commonFixtures from 'fixtures/common'
import { TaskReclassificationRequestModel } from 'modules/task/models'

export const getTaskReclassificationRequest =
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
