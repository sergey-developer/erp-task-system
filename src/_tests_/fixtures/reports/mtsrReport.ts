import { BaseMtsrReportItemModel } from 'modules/reports/types'

import { fakeId, fakeInteger, fakeWord } from '_tests_/utils'

export const getMtsrReportItem = (): BaseMtsrReportItemModel => ({
  id: fakeId(),
  title: fakeWord(),
  overdueTasks: fakeInteger(),
  completedTasks: fakeInteger(),
  allTasks: fakeInteger(),
  returnedAmount: fakeInteger(),
  averageExecutionTime: '272 07:45:28.494421',
})
