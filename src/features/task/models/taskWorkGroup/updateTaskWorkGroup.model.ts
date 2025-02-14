import { RequestWithTask } from 'features/task/types'

import { ErrorResponse } from 'shared/api/baseApi'
import { IdType } from 'shared/types/common'

export type UpdateTaskWorkGroupRequest = RequestWithTask & {
  workGroup: IdType
  workType?: IdType
  comment?: string
}

export type UpdateTaskWorkGroupResponse = void

export type UpdateTaskWorkGroupBadRequestResponse = ErrorResponse<
  Pick<UpdateTaskWorkGroupRequest, 'workGroup' | 'comment'>
>
