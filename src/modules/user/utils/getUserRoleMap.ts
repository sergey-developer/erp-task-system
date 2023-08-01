import isEqual from 'lodash/isEqual'

import { UserRoleEnum } from 'modules/user/constants/roles'

import { BooleanKey, BooleanMap } from 'shared/types/utils'

export type UserRoleMap = BooleanMap<
  BooleanKey<`${keyof typeof UserRoleEnum}Role`>
>

export const getUserRoleMap = (role?: UserRoleEnum): UserRoleMap => ({
  isFirstLineSupportRole: isEqual(role, UserRoleEnum.FirstLineSupport),
  isEngineerRole: isEqual(role, UserRoleEnum.Engineer),
  isSeniorEngineerRole: isEqual(role, UserRoleEnum.SeniorEngineer),
  isHeadOfDepartmentRole: isEqual(role, UserRoleEnum.HeadOfDepartment),
})
