import { UserRoleEnum } from 'shared/constants/roles'
import { MaybeNull } from 'shared/interfaces/utils'

export type UserProfileModel = {
  id: number
  firstName: string
  lastName: string
  role: UserRoleEnum
  email: string
  isStaff: boolean

  middleName?: string
  avatar?: string
  phone?: MaybeNull<string>
}
