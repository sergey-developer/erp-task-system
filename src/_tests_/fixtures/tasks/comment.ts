import { TaskCommentDTO } from 'features/tasks/api/dto'
import times from 'lodash/times'

import taskFixtures from '_tests_/fixtures/tasks'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const comment = (): TaskCommentDTO => ({
  id: fakeId(),
  text: fakeWord(),
  createdAt: fakeDateString(),
  author: {
    id: fakeId(),
    firstName: fakeWord(),
    lastName: fakeWord(),
    middleName: fakeWord(),
  },
  attachments: [taskFixtures.attachment()],
})

export const commentList = (length: number = 1): TaskCommentDTO[] => times(length, () => comment())
