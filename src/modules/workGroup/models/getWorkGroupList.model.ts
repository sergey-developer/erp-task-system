import { BaseTaskRequestArgs } from 'modules/task/types'

import { WorkGroupListModel } from './workGroupList.model'

export type GetWorkGroupListQueryArgs = Partial<BaseTaskRequestArgs>

export type GetWorkGroupListSuccessResponse = WorkGroupListModel
