import { TaskAttachmentModel } from 'modules/task/models'
import { UserModel } from 'modules/user/models'
import {
  RelocationTaskStatusEnum,
  RelocationTaskTypeEnum,
} from 'modules/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type RelocationTaskModel = {
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
  executor: MaybeNull<Pick<UserModel, 'id' | 'fullName'>>
  createdBy: MaybeNull<Pick<UserModel, 'id' | 'fullName'>>
  comment: MaybeNull<string>
  documents: MaybeNull<Pick<TaskAttachmentModel, 'id' | 'name' | 'url' | 'size'>[]>
  revision: MaybeNull<{
    relocationJournalEntry: IdType
    text: string
    createdAt: string
    user: Pick<UserModel, 'id' | 'fullName' | 'phone'>
  }>
}
