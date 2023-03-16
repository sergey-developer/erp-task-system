import { UserRoleEnum } from 'modules/user/constants/roles'

import { MaybeNull } from 'shared/interfaces/utils'

export type UserProfileModel = {
  id: number
  firstName: string
  lastName: string
  middleName: MaybeNull<string>
  role: UserRoleEnum
  email: string
  isStaff: boolean
  avatar: MaybeNull<string>
  phone: MaybeNull<string>
}
