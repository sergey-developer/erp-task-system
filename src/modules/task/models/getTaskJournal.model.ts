import { TaskModel } from './task.model'
import { TaskJournalModel } from './taskJournal.model'

export type GetTaskJournalQueryArgsModel = TaskModel['id']
export type GetTaskJournalResponseModel = TaskJournalModel
