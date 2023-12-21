import { TaskCountersModel } from 'modules/task/models'

import { fakeInteger } from '_tests_/utils'

export const taskCounters = (): TaskCountersModel => ({
  all: fakeInteger({ min: 1, max: 10 }),
  free: fakeInteger({ min: 1, max: 10 }),
  overdue: fakeInteger({ min: 1, max: 10 }),
  mine: fakeInteger({ min: 1, max: 10 }),
  firstLine: fakeInteger({ min: 1, max: 10 }),
  secondLine: fakeInteger({ min: 1, max: 10 }),
  less1Hour: fakeInteger({ min: 1, max: 10 }),
  less3Hours: fakeInteger({ min: 1, max: 10 }),
  reclassificationDenied: fakeInteger({ min: 1, max: 100 }),
})
