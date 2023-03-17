import times from 'lodash/times'

import { TaskCommentModel } from 'modules/task/models'

import commonFixtures from 'fixtures/common'

import { fakeDateString, fakeId, fakeWord } from '_tests_/utils'

export const getComment = (): TaskCommentModel => ({
  id: fakeId(),
  text: fakeWord(),
  createdAt: fakeDateString(),
  author: commonFixtures.getCommentAuthor(),
})

export const getCommentList = (length: number = 1): Array<TaskCommentModel> =>
  times(length, () => getComment())
