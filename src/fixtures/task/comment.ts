import times from 'lodash/times'

import { TaskCommentModel } from 'modules/task/models'

import commonFixtures from 'fixtures/common'
import taskFixtures from 'fixtures/task'

import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const fakeComment = (): TaskCommentModel => ({
  id: fakeId(),
  text: fakeWord(),
  createdAt: fakeDateString(),
  author: commonFixtures.fakeCommentAuthor(),
  attachments: [taskFixtures.fakeAttachment()],
})

export const fakeCommentList = (length: number = 1): Array<TaskCommentModel> =>
  times(length, () => fakeComment())
