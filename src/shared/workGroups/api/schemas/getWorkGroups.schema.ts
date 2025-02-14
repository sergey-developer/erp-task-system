import { TaskRequestArgs } from 'features/task/types'

import { MaybeUndefined } from 'shared/types/utils'
import { WorkGroupsDTO } from 'shared/workGroups/api/dto'

export type GetWorkGroupsRequest = MaybeUndefined<Partial<TaskRequestArgs>>
export type GetWorkGroupsResponse = WorkGroupsDTO
