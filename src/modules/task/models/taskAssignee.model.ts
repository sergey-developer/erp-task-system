import { BaseUserModel } from 'modules/user/models'
import { UserRolesEnum } from 'shared/constants/roles'
import { MaybeNull } from 'shared/interfaces/utils'

export type TaskAssigneeModel = BaseUserModel & {
  role: UserRolesEnum
  email: string
  lastLogin?: MaybeNull<string>
  isSuperuser?: boolean
  isStaff?: boolean
  dateJoined?: string
  phone?: MaybeNull<string>
  isActive?: boolean
  isReadyToWork?: boolean
  groups?: Array<number>
  userPermissions?: Array<number>
}
