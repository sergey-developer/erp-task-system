import { TaskModel } from './task.model'
import { TaskCommentModel } from './taskComment.model'

export type GetTaskCommentListQueryArgsModel = TaskModel['id']
export type GetTaskCommentListResponseModel = Array<TaskCommentModel>
