import { BaseUserModel } from 'modules/user/models'
import { MaybeNull } from 'shared/interfaces/utils'

export enum TaskJournalType {
  InternalCommunication = 'INTERNAL_COMMUNICATION',
  ExternalCommunication = 'EXTERNAL_COMMUNICATION',
  Awaiting = 'AWAITING',
  StatusChange = 'STATUS_CHANGE',
  Reclassified = 'RECLASSIFIED',
  AssigneeChange = 'ASSIGNEE_CHANGE',
  TechMessage = 'TECH_MESSAGE',
  Job = 'JOB',
  Attachment = 'ATTACHMENT',
  Other = 'OTHER',
}

export enum TaskJournalSourceEnum {
  X5 = 'X5',
  ITSM = 'ITSM',
}

export type TaskJournalItemModel = {
  id: number
  author: MaybeNull<Omit<BaseUserModel, 'avatar'>>
  createdAt: string
  updatedAt: string
  type: TaskJournalType
  description: string
  sourceSystem: TaskJournalSourceEnum
  task: number
  recordId?: string
}

export type TaskJournalModel = Array<TaskJournalItemModel>
