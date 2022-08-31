import { TaskDetailsModel } from './taskDetails.model'
import { TaskJournalModel } from './taskJournal.model'

export type GetTaskJournalQueryArgsModel = TaskDetailsModel['id']
export type GetTaskJournalResponseModel = TaskJournalModel
