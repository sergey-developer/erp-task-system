import times from 'lodash/times'

import { generateDateString, generateId, generateWord } from '_tests_/utils'
import { getCommentAuthor } from 'fixtures/common'
import { TaskCommentModel } from 'modules/task/features/TaskView/models'

export const getTaskComment = (): TaskCommentModel => ({
  id: generateId(),
  text: generateWord(),
  createdAt: generateDateString(),
  author: getCommentAuthor(),
})

export const getTaskCommentList = (length: number = 1) =>
  times(length, () => getTaskComment())
