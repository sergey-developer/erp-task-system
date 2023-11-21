import { IdType } from 'shared/types/common'

import { SubTaskModel } from './subTask.model'

export type GetSubTaskListQueryArgs = IdType
export type GetSubTaskListSuccessResponse = SubTaskModel[]
