import { TaskApiEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { generateApiPath } from 'shared/utils/api'

export const getTaskJournalUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetTaskJournal, { id: String(taskId) })

export const getTaskJournalCsvUrl = (taskId: IdType): string =>
  generateApiPath(TaskApiEnum.GetTaskJournalCsv, { id: String(taskId) })
