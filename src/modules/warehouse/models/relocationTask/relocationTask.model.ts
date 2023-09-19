import { UserModel } from 'modules/user/models'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type RelocationTaskModel = {
  id: IdType
  deadlineAt: string
  status: string
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
