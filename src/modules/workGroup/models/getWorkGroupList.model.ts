import { BaseTaskRequestArgs } from 'modules/task/types'

import { MaybeUndefined } from 'shared/types/utils'

import { WorkGroupListModel } from './workGroupList.model'

export type GetWorkGroupListQueryArgs = MaybeUndefined<Partial<BaseTaskRequestArgs>>

export type GetWorkGroupListSuccessResponse = WorkGroupListModel
