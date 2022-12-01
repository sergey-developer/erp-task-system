import { SubTaskModel } from './subTask.model'
import { TaskDetailsModel } from './taskDetails.model'

export type GetSubTaskListQueryArgsModel = TaskDetailsModel['id']

export type GetSubTaskListResponseModel = Array<SubTaskModel>
