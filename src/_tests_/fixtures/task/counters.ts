import { TaskCountersModel } from 'modules/task/models'

import { fakeInteger } from '_tests_/utils'

export const taskCounters = (): TaskCountersModel => ({
  allLines: fakeInteger({ min: 1, max: 100 }),
  allInLine: fakeInteger({ min: 1, max: 100 }),
  free: fakeInteger({ min: 1, max: 100 }),
  overdue: fakeInteger({ min: 1, max: 100 }),
  mine: fakeInteger({ min: 1, max: 100 }),
  firstLine: fakeInteger({ min: 1, max: 100 }),
  secondLine: fakeInteger({ min: 1, max: 100 }),
  less1Hour: fakeInteger({ min: 1, max: 100 }),
  less3Hours: fakeInteger({ min: 1, max: 100 }),
  returned: fakeInteger({ min: 1, max: 100 }),
  reclassificationDenied: fakeInteger({ min: 1, max: 100 }),
})
