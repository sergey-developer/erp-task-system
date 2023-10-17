import { TaskCommentModel } from 'modules/task/models'
import { BaseTaskRequestArgs } from 'modules/task/types'

export type GetTaskCommentListQueryArgs = BaseTaskRequestArgs

export type GetTaskCommentListSuccessResponse = TaskCommentModel[]
