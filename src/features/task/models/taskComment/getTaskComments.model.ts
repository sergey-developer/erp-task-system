import { TaskCommentModel } from 'features/task/models'
import { RequestWithTask } from 'features/task/types'

export type GetTaskCommentListRequest = RequestWithTask

export type GetTaskCommentListResponse = TaskCommentModel[]
