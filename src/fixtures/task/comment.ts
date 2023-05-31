import times from 'lodash/times'

import { TaskCommentModel } from 'modules/task/models'

import commonFixtures from 'fixtures/common'

import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const fakeComment = (): TaskCommentModel => ({
  id: fakeId(),
  text: fakeWord(),
  createdAt: fakeDateString(),
  author: commonFixtures.fakeCommentAuthor(),
})

export const fakeCommentList = (length: number = 1): Array<TaskCommentModel> =>
  times(length, () => fakeComment())
