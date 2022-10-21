import { getCommentAuthor } from '_fixtures_/common'
import { generateDateString, generateId, generateWord } from '_tests_/utils'
import { TaskCommentTypeEnum } from 'modules/task/constants/common'
import { TaskDetailsCommentModel } from 'modules/task/features/TaskView/models'

export const getTaskComment = (
  data?: Partial<TaskDetailsCommentModel>,
): TaskDetailsCommentModel => ({
  id: generateId(),
  taskId: generateId(),
  text: data?.text || generateWord(),
  createdAt: generateDateString(),
  type: TaskCommentTypeEnum.Common,
  author: getCommentAuthor(),
  attachments: [],
})
