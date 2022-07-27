import { TaskCommentTypeEnum } from 'modules/task/constants/enums'

export type BaseTaskCommentModel = {
  id: number
  createdAt: string
  type: TaskCommentTypeEnum
  text: string
}
