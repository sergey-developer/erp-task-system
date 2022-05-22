import { TaskCommentTypeEnum } from './constants'

export type BaseTaskCommentModel = {
  id: number
  createdAt: string
  updatedAt: string
  type: TaskCommentTypeEnum
  text: string
  task: number
}
