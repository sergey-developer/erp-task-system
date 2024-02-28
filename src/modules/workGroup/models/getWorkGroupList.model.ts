import { TaskRequestArgs } from 'modules/task/types'

import { MaybeUndefined } from 'shared/types/utils'

import { WorkGroupListModel } from './workGroupList.model'

export type GetWorkGroupListQueryArgs = MaybeUndefined<Partial<TaskRequestArgs>>

export type GetWorkGroupListSuccessResponse = WorkGroupListModel
