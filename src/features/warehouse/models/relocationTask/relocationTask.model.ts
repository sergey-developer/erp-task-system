import { TaskModel } from 'features/task/models'
import { UserDetailDTO } from 'features/users/api/dto'
import {
  ExternalRelocationStatusEnum,
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'features/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { RelocationTaskAttachmentModel } from './relocationTaskAttachment.model'

export type ExternalRelocationModel = {
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
  executors: Pick<UserDetailDTO, 'id' | 'fullName'>[]

  relocateFrom: MaybeNull<{
    id: IdType
    title: string
  }>
  relocateTo: MaybeNull<{
    id: IdType
    title: string
  }>
  // controllers: MaybeNull<Array<Pick<UserModel, 'id' | 'fullName' | 'phone'>>>
  controller: MaybeNull<Pick<UserDetailDTO, 'id' | 'fullName' | 'phone'>>
  createdBy: MaybeNull<Pick<UserDetailDTO, 'id' | 'fullName'>>
  completedBy: MaybeNull<Pick<UserDetailDTO, 'id' | 'fullName'>>
  comment: MaybeNull<string>
  documents: MaybeNull<RelocationTaskAttachmentModel[]>
  revision: MaybeNull<{
    relocationJournalEntry: IdType
    text: string
    createdAt: string
    user: Pick<UserDetailDTO, 'id' | 'fullName' | 'phone'>
  }>
  task: MaybeNull<Pick<TaskModel, 'id' | 'recordId'>>
  externalRelocation: MaybeNull<ExternalRelocationModel>
}
