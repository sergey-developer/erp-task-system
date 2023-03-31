import { GetTaskCountersSuccessResponse } from 'modules/task/models'

import { fakeInteger } from '_tests_/utils'

export const getTaskCountersResponse = (): GetTaskCountersSuccessResponse => ({
  all: fakeInteger({ min: 1, max: 10 }),
  free: fakeInteger({ min: 1, max: 10 }),
  overdue: fakeInteger({ min: 1, max: 10 }),
  mine: fakeInteger({ min: 1, max: 10 }),
  closed: fakeInteger({ min: 1, max: 10 }),
})
