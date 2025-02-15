import { TaskDetailDTO } from 'features/tasks/api/dto'
import { UserDetailDTO } from 'features/users/api/dto'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { RelocationTaskStatusEnum, RelocationTaskTypeEnum } from '../constants'
import { ExternalRelocationDetailDTO } from './externalRelocationTaskDetail.dto'
import { RelocationTaskAttachmentDetailDTO } from './relocationTaskAttachment.dto'

export type RelocationTaskDetailDTO = {
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
  documents: MaybeNull<RelocationTaskAttachmentDetailDTO[]>
  revision: MaybeNull<{
    relocationJournalEntry: IdType
    text: string
    createdAt: string
    user: Pick<UserDetailDTO, 'id' | 'fullName' | 'phone'>
  }>
  task: MaybeNull<Pick<TaskDetailDTO, 'id' | 'recordId'>>
  externalRelocation: MaybeNull<ExternalRelocationDetailDTO>
}
