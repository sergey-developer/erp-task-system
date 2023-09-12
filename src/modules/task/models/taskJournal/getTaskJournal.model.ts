import { TaskJournalModel } from 'modules/task/models'
import { BaseTaskRequestArgs } from 'modules/task/types'

export type GetTaskJournalQueryArgs = BaseTaskRequestArgs

export type GetTaskJournalSuccessResponse = TaskJournalModel
