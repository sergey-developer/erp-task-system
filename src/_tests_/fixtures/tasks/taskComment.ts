import { TaskCommentDTO } from 'features/tasks/api/dto'
import times from 'lodash/times'

import tasksFixtures from '_tests_/fixtures/tasks'
import { fakeDateString, fakeId, fakeWord } from '_tests_/helpers'

export const taskComment = (): TaskCommentDTO => ({
  id: fakeId(),
  text: fakeWord(),
  createdAt: fakeDateString(),
  author: {
    id: fakeId(),
    firstName: fakeWord(),
    lastName: fakeWord(),
    middleName: fakeWord(),
  },
  attachments: [tasksFixtures.taskAttachment()],
})

export const taskComments = (length: number = 1): TaskCommentDTO[] =>
  times(length, () => taskComment())
