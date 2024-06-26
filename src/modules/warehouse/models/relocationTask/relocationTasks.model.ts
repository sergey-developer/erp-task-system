import { TaskAttachmentModel } from 'modules/task/models'
import { UserModel } from 'modules/user/models'
import {
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'modules/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type RelocationTaskListItemModel = {
  id: IdType
  type: RelocationTaskTypeEnum
  deadlineAt: string
  status: RelocationTaskStatusEnum
  createdAt: string

  relocateFrom: MaybeNull<{
    id: IdType
    title: string
  }>
  relocateTo: MaybeNull<{
    id: IdType
    title: string
  }>
  executor: MaybeNull<Pick<UserModel, 'id' | 'fullName' | 'phone'>>
  controller: MaybeNull<Pick<UserModel, 'id' | 'fullName'>>
  createdBy: MaybeNull<Pick<UserModel, 'id' | 'fullName'>>
  documents: MaybeNull<Pick<TaskAttachmentModel, 'id' | 'name' | 'url' | 'size'>[]>
}

export type RelocationTasksModel = RelocationTaskListItemModel[]
