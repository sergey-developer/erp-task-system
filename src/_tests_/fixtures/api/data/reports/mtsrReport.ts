import { BaseMtsrReportItemDTO } from 'features/reports/api/dto'

import { fakeId, fakeInteger, fakeWord } from '_tests_/helpers'

export const getMtsrReportItem = (): BaseMtsrReportItemDTO => ({
  id: fakeId(),
  title: fakeWord(),
  overdueTasks: fakeInteger(),
  completedTasks: fakeInteger(),
  allTasks: fakeInteger(),
  returnedAmount: fakeInteger(),
  averageExecutionTime: '272 07:45:28.494421',
})
