import { generateInteger } from '_tests_/utils'
import { GetTaskCountersResponseModel } from 'modules/task/features/TaskList/models'

export const getGetTaskCountersResponse = (): GetTaskCountersResponseModel => ({
  all: generateInteger({ min: 1, max: 10 }),
  free: generateInteger({ min: 1, max: 10 }),
  overdue: generateInteger({ min: 1, max: 10 }),
  mine: generateInteger({ min: 1, max: 10 }),
  closed: generateInteger({ min: 1, max: 10 }),
})
