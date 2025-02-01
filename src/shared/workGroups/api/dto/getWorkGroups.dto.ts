import { TaskRequestArgs } from 'features/task/types'

import { MaybeUndefined } from 'shared/types/utils'

import { WorkGroupsDTO } from './workGroups.dto'

export type GetWorkGroupsQueryArgs = MaybeUndefined<Partial<TaskRequestArgs>>

export type GetWorkGroupsSuccessResponse = WorkGroupsDTO
