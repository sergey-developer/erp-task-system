import { TaskModel } from './task.model'
import { TaskJournalModel } from './taskJournal.model'

export type GetTaskJournalQueryArgs = TaskModel['id']
export type GetTaskJournalSuccessResponse = TaskJournalModel
