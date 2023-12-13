import { IdType } from 'shared/types/common'

export const getJournalCsvFilename = (taskId: IdType): string => `csv/заявка-${taskId}`
