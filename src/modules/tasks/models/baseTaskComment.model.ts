import { TaskCommentTypeEnum } from 'modules/tasks/constants/enums'

export type BaseTaskCommentModel = {
  id: number
  createdAt: string
  type: TaskCommentTypeEnum
  text: string
}
