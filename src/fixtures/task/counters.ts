import { GetTaskCountersSuccessResponse } from 'modules/task/models'

import { generateInteger } from '_tests_/utils'

export const getTaskCountersResponse = (): GetTaskCountersSuccessResponse => ({
  all: generateInteger({ min: 1, max: 10 }),
  free: generateInteger({ min: 1, max: 10 }),
  overdue: generateInteger({ min: 1, max: 10 }),
  mine: generateInteger({ min: 1, max: 10 }),
  closed: generateInteger({ min: 1, max: 10 }),
})
