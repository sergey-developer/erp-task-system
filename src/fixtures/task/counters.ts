import { GetTaskCountersSuccessResponse } from 'modules/task/models'

import { fakeInteger } from '_tests_/utils'

export const fakeTaskCountersResponse = (): GetTaskCountersSuccessResponse => ({
  all: fakeInteger({ min: 1, max: 10 }),
  free: fakeInteger({ min: 1, max: 10 }),
  overdue: fakeInteger({ min: 1, max: 10 }),
  mine: fakeInteger({ min: 1, max: 10 }),
  firstline: fakeInteger({ min: 1, max: 10 }),
  secondline: fakeInteger({ min: 1, max: 10 }),
  lessonehour: fakeInteger({ min: 1, max: 10 }),
  lessthreehour: fakeInteger({ min: 1, max: 10 }),
})
