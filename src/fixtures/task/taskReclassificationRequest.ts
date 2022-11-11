import { generateDateString, generateId, generateWord } from '_tests_/utils'
import { TaskReclassificationRequestModel } from 'modules/task/features/TaskView/models'

import * as commonFixtures from '../common'

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
