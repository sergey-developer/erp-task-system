import { TaskCommentModel } from 'features/task/models'
import { TaskRequestArgs } from 'features/task/types'

export type GetTaskCommentListQueryArgs = TaskRequestArgs

export type GetTaskCommentListSuccessResponse = TaskCommentModel[]
