import { TaskModel } from 'modules/task/models'
import { UserModel } from 'modules/user/models'
import {
  ExternalRelocationStatusEnum,
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'modules/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { RelocationTaskAttachmentModel } from './relocationTaskAttachment.model'

type ExternalRelocationModel = {
  id: IdType
  number: MaybeNull<string>
  status: MaybeNull<ExternalRelocationStatusEnum>
}

export type RelocationTaskModel = {
  id: IdType
  type: RelocationTaskTypeEnum
  deadlineAt: string
  status: RelocationTaskStatusEnum
  createdAt: string
  executors: Pick<UserModel, 'id' | 'fullName'>[]

  relocateFrom: MaybeNull<{
    id: IdType
    title: string
  }>
  relocateTo: MaybeNull<{
    id: IdType
    title: string
  }>
  controller: MaybeNull<Pick<UserModel, 'id' | 'fullName'>>
  createdBy: MaybeNull<Pick<UserModel, 'id' | 'fullName'>>
  completedBy: MaybeNull<Pick<UserModel, 'id' | 'fullName'>>
  comment: MaybeNull<string>
  documents: MaybeNull<RelocationTaskAttachmentModel[]>
  revision: MaybeNull<{
    relocationJournalEntry: IdType
    text: string
    createdAt: string
    user: Pick<UserModel, 'id' | 'fullName' | 'phone'>
  }>
  task: MaybeNull<Pick<TaskModel, 'id' | 'recordId'>>
  externalRelocation: MaybeNull<ExternalRelocationModel>
}
