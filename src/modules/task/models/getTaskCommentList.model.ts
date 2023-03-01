import { TaskModel } from './task.model'
import { TaskCommentModel } from './taskComment.model'

export type GetTaskCommentListQueryArgs = TaskModel['id']
export type GetTaskCommentListSuccessResponse = Array<TaskCommentModel>
