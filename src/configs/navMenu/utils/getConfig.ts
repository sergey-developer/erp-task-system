import { UserRoleEnum } from 'modules/user/constants'

import navMenuCommonConfig from '../navMenu.common.config'
import navMenuEngineerConfig from '../navMenu.engineer.config'
import navMenuHeadOfDepartmentConfig from '../navMenu.headOfDepartment.config'
import navMenuSeniorEngineerConfig from '../navMenu.seniorEngineer.config'
import { NavMenuItem } from '../types'

export const getNavMenuConfig = (role: UserRoleEnum): NavMenuItem[] => {
  switch (role) {
    case UserRoleEnum.FirstLineSupport:
      return navMenuCommonConfig
    case UserRoleEnum.Engineer:
      return [...navMenuCommonConfig, ...navMenuEngineerConfig]
    case UserRoleEnum.SeniorEngineer:
      return [...navMenuCommonConfig, ...navMenuSeniorEngineerConfig]
    case UserRoleEnum.HeadOfDepartment:
      return [...navMenuCommonConfig, ...navMenuHeadOfDepartmentConfig]
    default:
      return navMenuCommonConfig
  }
}
