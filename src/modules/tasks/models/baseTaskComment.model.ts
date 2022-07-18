import { TaskCommentTypeEnum } from '../constants'

export type BaseTaskCommentModel = {
  id: number
  createdAt: string
  type: TaskCommentTypeEnum
  text: string
}
