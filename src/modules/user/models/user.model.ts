import { UserRoleEnum } from 'modules/user/constants/roles'

import { MaybeNull } from 'shared/types/utils'

import { UserStatusModel } from './userStatus.model'

export type BaseUserModel = {
  id: number
  firstName: string
  lastName: string
  middleName: MaybeNull<string>
  avatar: MaybeNull<string>
}

export type UserModel = BaseUserModel & {
  role: UserRoleEnum
  email: string
  timezone: string
  isStaff: boolean
  phone: MaybeNull<string>
  status: UserStatusModel
}
