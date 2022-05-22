import UserRolesEnum from 'shared/constants/roles'
import { MaybeNull } from 'shared/interfaces/utils'

export type AssigneeModel = {
  id: number
  firstName: string
  lastName: string
  role: UserRolesEnum
  email: string
  lastLogin?: MaybeNull<string>
  isSuperuser?: boolean
  isStaff?: boolean
  dateJoined?: string
  middleName?: string
  avatar?: string
  phone?: MaybeNull<string>
  isActive?: boolean
  isReadyToWork?: boolean
  groups?: Array<number>
  userPermissions?: Array<number>
}
