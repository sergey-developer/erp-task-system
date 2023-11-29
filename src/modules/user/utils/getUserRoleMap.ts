import isEqual from 'lodash/isEqual'

import { UserRoleEnum } from 'modules/user/constants'

import { BooleanKey, BooleanMap } from 'shared/types/utils'

export const checkRoleIsFirstLineSupport = (role?: UserRoleEnum): boolean =>
  isEqual(role, UserRoleEnum.FirstLineSupport)

export const checkRoleIsEngineer = (role?: UserRoleEnum): boolean =>
  isEqual(role, UserRoleEnum.Engineer)

export const checkRoleIsSeniorEngineer = (role?: UserRoleEnum): boolean =>
  isEqual(role, UserRoleEnum.SeniorEngineer)

export const checkRoleIsHeadOfDepartment = (role?: UserRoleEnum): boolean =>
  isEqual(role, UserRoleEnum.HeadOfDepartment)

export type UserRoleMap = BooleanMap<BooleanKey<`${keyof typeof UserRoleEnum}Role`>>

export const getUserRoleMap = (role?: UserRoleEnum): UserRoleMap => ({
  isFirstLineSupportRole: checkRoleIsFirstLineSupport(role),
  isEngineerRole: checkRoleIsEngineer(role),
  isSeniorEngineerRole: checkRoleIsSeniorEngineer(role),
  isHeadOfDepartmentRole: checkRoleIsHeadOfDepartment(role),
})
