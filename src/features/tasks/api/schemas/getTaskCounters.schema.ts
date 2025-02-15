import { TasksFastFilterEnum } from 'features/tasks/api/constants'
import { TaskCountersDTO } from 'features/tasks/api/dto'

import { IdType } from 'shared/types/common'

export type GetTaskCountersRequest = Partial<{
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
  line: TasksFastFilterEnum.FirstLine | TasksFastFilterEnum.SecondLine
}>

export type GetTaskCountersResponse = TaskCountersDTO
