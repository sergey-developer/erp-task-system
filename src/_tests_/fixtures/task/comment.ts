import { TaskCommentModel } from 'features/task/models'
import times from 'lodash/times'

import taskFixtures from '_tests_/fixtures/task'
import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const comment = (): TaskCommentModel => ({
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

export const commentList = (length: number = 1): TaskCommentModel[] =>
  times(length, () => comment())
