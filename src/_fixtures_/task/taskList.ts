import { generateDateString, generateId, generateSentence } from '_tests_/utils'
import { TaskCommentTypeEnum } from 'modules/task/constants/common'
import { TaskListItemModel } from 'modules/task/features/TaskList/models'

export const getTaskListComment = (): TaskListItemModel['comment'] => ({
  id: generateId(),
  type: TaskCommentTypeEnum.Common,
  task: generateId(),
  author: generateId(),
  text: generateSentence(),
  createdAt: generateDateString(),
  updatedAt: generateDateString(),
})
