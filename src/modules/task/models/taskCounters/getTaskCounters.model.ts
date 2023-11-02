import { TaskCountersModel } from 'modules/task/models'

import { IdType } from 'shared/types/common'

export type GetTaskCountersQueryArgs = Partial<{
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
}>

export type GetTaskCountersSuccessResponse = TaskCountersModel
