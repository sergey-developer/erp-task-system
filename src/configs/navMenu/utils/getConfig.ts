import { UserRoleEnum } from 'modules/user/constants/roles'

import { isEqual } from 'shared/utils/common/isEqual'

import { NavMenuItem } from '../interfaces'
import navMenuCommonConfig from '../navMenu.common.config'
import navMenuHeadOfDepartmentConfig from '../navMenu.headOfDepartment.config'
import navMenuSeniorEngineerConfig from '../navMenu.seniorEngineer.config'

const getNavMenuConfig = (role: UserRoleEnum): Array<NavMenuItem> => {
  if (isEqual(role, UserRoleEnum.FirstLineSupport)) return navMenuCommonConfig

  if (isEqual(role, UserRoleEnum.SeniorEngineer))
    return [...navMenuCommonConfig, ...navMenuSeniorEngineerConfig]

  if (isEqual(role, UserRoleEnum.HeadOfDepartment))
    return [...navMenuCommonConfig, ...navMenuHeadOfDepartmentConfig]

  return navMenuCommonConfig
}

export default getNavMenuConfig
