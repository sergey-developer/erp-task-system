import { UserRolesEnum } from 'shared/constants/roles'
import { BooleanMap } from 'shared/interfaces/utils'
import { isEqual } from 'shared/utils/common/isEqual'

export type UserRoleMap = BooleanMap<`is${keyof typeof UserRolesEnum}Role`>

export const getUserRole = (role?: UserRolesEnum): UserRoleMap => ({
  isFirstLineSupportRole: isEqual(role, UserRolesEnum.FirstLineSupport),
  isEngineerRole: isEqual(role, UserRolesEnum.Engineer),
  isSeniorEngineerRole: isEqual(role, UserRolesEnum.SeniorEngineer),
  isHeadOfDepartmentRole: isEqual(role, UserRolesEnum.HeadOfDepartment),
})
