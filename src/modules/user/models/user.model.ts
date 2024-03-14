import { UserPermissionsEnum, UserRoleEnum } from 'modules/user/constants'

import { UserStatusModel } from 'shared/models/catalogs/userStatus'
import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type BaseUserModel = {
  id: IdType
  firstName: string
  lastName: string
  middleName: MaybeNull<string>
  avatar: MaybeNull<string>
}

export type UserModel = BaseUserModel & {
  fullName: string
  role: UserRoleEnum
  email: string
  timezone: string
  isStaff: boolean
  phone: MaybeNull<string>
  status: UserStatusModel
  permissions: UserPermissionsEnum[]
}
