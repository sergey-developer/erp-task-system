import { TasksFastFilterEnum } from 'features/task/constants/task'
import { TaskCountersModel } from 'features/task/models'

import { IdType } from 'shared/types/common'

export type GetTaskCountersQueryArgs = Partial<{
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
  line: TasksFastFilterEnum.FirstLine | TasksFastFilterEnum.SecondLine
}>

export type GetTaskCountersSuccessResponse = TaskCountersModel
