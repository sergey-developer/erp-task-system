import { TaskRequestArgs } from 'features/task/types'

import { MaybeUndefined } from 'shared/types/utils'

import { WorkGroupsModel } from './workGroups.model'

export type GetWorkGroupsQueryArgs = MaybeUndefined<Partial<TaskRequestArgs>>

export type GetWorkGroupsSuccessResponse = WorkGroupsModel
