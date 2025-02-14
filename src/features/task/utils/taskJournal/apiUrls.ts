import { TaskApiEnum } from 'features/task/constants/task'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const getTaskJournalApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetTaskJournal, { id: String(taskId) })

export const getTaskJournalCsvApiPath = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetTaskJournalCsv, { id: String(taskId) })
