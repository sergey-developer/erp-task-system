import { getCommentAuthor } from '_fixtures_/common'
import { generateDateString, generateId, generateWord } from '_tests_/utils'
import { TaskCommentTypeEnum } from 'modules/task/constants/common'
import { TaskDetailsCommentModel } from 'modules/task/features/TaskView/models'

export const getTaskComment = (): TaskDetailsCommentModel => ({
  id: generateId(),
  taskId: generateId(),
  text: generateWord(),
  createdAt: generateDateString(),
  type: TaskCommentTypeEnum.Common,
  author: getCommentAuthor(),
  attachments: [],
})
