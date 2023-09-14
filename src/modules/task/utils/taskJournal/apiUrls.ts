import { generatePath } from 'react-router-dom'

import { TaskApiEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { appendSlashAtEnd } from 'shared/utils/string'

export const getTaskJournalUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.GetTaskJournal, { id: String(taskId) }))

export const getTaskJournalCsvUrl = (taskId: IdType): string =>
  appendSlashAtEnd(generatePath(TaskApiEnum.GetTaskJournalCsv, { id: String(taskId) }))
