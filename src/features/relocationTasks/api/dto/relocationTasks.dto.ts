import { TaskAttachmentDTO } from 'features/tasks/api/dto'
import { UserDetailDTO } from 'features/users/api/dto'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

import { RelocationTaskStatusEnum, RelocationTaskTypeEnum } from '../constants'

export type RelocationTaskDTO = {
  id: IdType
  type: RelocationTaskTypeEnum
  deadlineAt: string
  status: RelocationTaskStatusEnum
  createdAt: string
  executors: Pick<UserDetailDTO, 'id' | 'fullName' | 'phone'>[]

  relocateFrom: MaybeNull<{
    id: IdType
    title: string
  }>
  relocateTo: MaybeNull<{
    id: IdType
    title: string
  }>
  controller: MaybeNull<Pick<UserDetailDTO, 'id' | 'fullName'>>
  createdBy: MaybeNull<Pick<UserDetailDTO, 'id' | 'fullName'>>
  completedBy: MaybeNull<Pick<UserDetailDTO, 'id' | 'fullName' | 'phone'>>
  documents: MaybeNull<Pick<TaskAttachmentDTO, 'id' | 'name' | 'url' | 'size'>[]>
}

export type RelocationTasksDTO = RelocationTaskDTO[]
