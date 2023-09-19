import { UserModel } from 'modules/user/models'
import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type RelocationTaskModel = {
  id: IdType
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
}
