import { TasksFastFilterEnum } from 'modules/task/constants/task'
import { TaskCountersModel } from 'modules/task/models'

import { IdType } from 'shared/types/common'

export type GetTaskCountersQueryArgs = Partial<{
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
  line: TasksFastFilterEnum[]
}>

export type GetTaskCountersSuccessResponse = TaskCountersModel
