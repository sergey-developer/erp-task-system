import { TaskCommentModel } from 'features/task/models'
import { TaskRequestArgs } from 'features/task/types'

export type GetTaskCommentListRequest = TaskRequestArgs

export type GetTaskCommentListResponse = TaskCommentModel[]
