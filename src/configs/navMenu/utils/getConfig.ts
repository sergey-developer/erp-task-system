import UserRolesEnum from 'shared/constants/roles'

import { NavMenuItem } from '../interfaces'
import navMenuAdminConfig from '../navMenu.admin.config'
import navMenuCommonConfig from '../navMenu.common.config'
import navMenuHeadOfDepartmentConfig from '../navMenu.headOfDepartment.config'
import navMenuSeniorEngineerConfig from '../navMenu.seniorEngineer.config'

const getNavMenuConfig = (role: UserRolesEnum): Array<NavMenuItem> => {
  switch (role) {
    case UserRolesEnum.FirstLineSupport: {
      return navMenuCommonConfig
    }

    case UserRolesEnum.SeniorEngineer: {
      return [...navMenuCommonConfig, ...navMenuSeniorEngineerConfig]
    }

    case UserRolesEnum.HeadOfDepartment: {
      return [...navMenuCommonConfig, ...navMenuHeadOfDepartmentConfig]
    }

    case UserRolesEnum.Admin: {
      return navMenuAdminConfig
    }

    default: {
      return navMenuCommonConfig
    }
  }
}

export default getNavMenuConfig
