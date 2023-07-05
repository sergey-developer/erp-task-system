import { UserRoleEnum } from 'modules/user/constants/roles'
import { getUserRoleMap } from 'modules/user/utils'

import { NavMenuItem } from '../interfaces'
import navMenuCommonConfig from '../navMenu.common.config'
import navMenuHeadOfDepartmentConfig from '../navMenu.headOfDepartment.config'
import navMenuSeniorEngineerConfig from '../navMenu.seniorEngineer.config'

const getNavMenuConfig = (role: UserRoleEnum): Array<NavMenuItem> => {
  const {
    isFirstLineSupportRole,
    isSeniorEngineerRole,
    isHeadOfDepartmentRole,
  } = getUserRoleMap(role)

  if (isFirstLineSupportRole) return navMenuCommonConfig

  if (isSeniorEngineerRole)
    return [...navMenuCommonConfig, ...navMenuSeniorEngineerConfig]

  if (isHeadOfDepartmentRole)
    return [...navMenuCommonConfig, ...navMenuHeadOfDepartmentConfig]

  return navMenuCommonConfig
}

export default getNavMenuConfig
