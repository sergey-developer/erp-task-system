import { TaskCommentTypeEnum } from 'modules/task/constants/common'

export type BaseTaskCommentModel = {
  id: number
  createdAt: string
  type: TaskCommentTypeEnum
  text: string
}
