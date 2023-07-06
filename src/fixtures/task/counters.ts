import { GetTaskCountersSuccessResponse } from 'modules/task/models'

import { fakeInteger } from '_tests_/utils'

export const fakeTaskCountersResponse = (): GetTaskCountersSuccessResponse => ({
  all: fakeInteger({ min: 1, max: 10 }),
  free: fakeInteger({ min: 1, max: 10 }),
  overdue: fakeInteger({ min: 1, max: 10 }),
  mine: fakeInteger({ min: 1, max: 10 }),
  first_line: fakeInteger({ min: 1, max: 10 }),
  second_line: fakeInteger({ min: 1, max: 10 }),
  less_1_hour: fakeInteger({ min: 1, max: 10 }),
  less_3_hours: fakeInteger({ min: 1, max: 10 }),
})
