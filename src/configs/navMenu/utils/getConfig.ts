import { UserRolesEnum } from 'shared/constants/roles'
import { isEqual } from 'shared/utils/common/isEqual'

import { NavMenuItem } from '../interfaces'
import navMenuCommonConfig from '../navMenu.common.config'
import navMenuHeadOfDepartmentConfig from '../navMenu.headOfDepartment.config'
import navMenuSeniorEngineerConfig from '../navMenu.seniorEngineer.config'

const getNavMenuConfig = (role: UserRolesEnum): Array<NavMenuItem> => {
  if (isEqual(role, UserRolesEnum.FirstLineSupport)) return navMenuCommonConfig

  if (isEqual(role, UserRolesEnum.SeniorEngineer))
    return [...navMenuCommonConfig, ...navMenuSeniorEngineerConfig]

  if (isEqual(role, UserRolesEnum.HeadOfDepartment))
    return [...navMenuCommonConfig, ...navMenuHeadOfDepartmentConfig]

  return navMenuCommonConfig
}

export default getNavMenuConfig
