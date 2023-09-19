import times from 'lodash/times'

import { TaskCommentModel } from 'modules/task/models'

import commonFixtures from '_tests_/fixtures/common'
import taskFixtures from '_tests_/fixtures/task'

import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const comment = (): TaskCommentModel => ({
  id: fakeId(),
  text: fakeWord(),
  createdAt: fakeDateString(),
  author: commonFixtures.commentAuthor(),
  attachments: [taskFixtures.attachment()],
})

export const commentList = (length: number = 1): TaskCommentModel[] =>
  times(length, () => comment())
