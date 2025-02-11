import { TaskAttachmentModel } from 'features/task/models'
import { UserDetailDTO } from 'features/users/api/dto'
import {
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'features/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type RelocationTaskListItemModel = {
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
  documents: MaybeNull<Pick<TaskAttachmentModel, 'id' | 'name' | 'url' | 'size'>[]>
}

export type RelocationTasksModel = RelocationTaskListItemModel[]
