import { TaskCommentModel } from 'modules/task/models'
import { TaskRequestArgs } from 'modules/task/types'

export type GetTaskCommentListQueryArgs = TaskRequestArgs

export type GetTaskCommentListSuccessResponse = TaskCommentModel[]
