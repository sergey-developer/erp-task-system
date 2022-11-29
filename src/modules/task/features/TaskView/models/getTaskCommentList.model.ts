import { TaskCommentModel } from './taskComment.model'
import { TaskDetailsModel } from './taskDetails.model'

export type GetTaskCommentListQueryArgsModel = TaskDetailsModel['id']

export type GetTaskCommentListResponseModel = Array<TaskCommentModel>
