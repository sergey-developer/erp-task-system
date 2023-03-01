import times from 'lodash/times'

import { TaskCommentModel } from 'modules/task/models'

import commonFixtures from 'fixtures/common'

import { generateDateString, generateId, generateWord } from '_tests_/utils'

export const getComment = (): TaskCommentModel => ({
  id: generateId(),
  text: generateWord(),
  createdAt: generateDateString(),
  author: commonFixtures.getCommentAuthor(),
})

export const getCommentList = (length: number = 1): Array<TaskCommentModel> =>
  times(length, () => getComment())
