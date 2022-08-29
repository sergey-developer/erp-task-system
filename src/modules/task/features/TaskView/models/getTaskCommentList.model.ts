import { TaskDetailsModel } from './taskDetails.model'
import { TaskDetailsCommentModel } from './taskDetailsComment.model'

export type GetTaskCommentListQueryArgsModel = TaskDetailsModel['id']
export type GetTaskCommentListResponseModel = Array<TaskDetailsCommentModel>
