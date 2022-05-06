import UserRoles from 'shared/constants/roles'

import { NavMenuItem } from '../interfaces'
import navMenuAdminConfig from '../navMenu.admin.config'
import navMenuCommonConfig from '../navMenu.common.config'
import navMenuHeadOfDepartmentConfig from '../navMenu.headOfDepartment.config'
import navMenuSeniorEngineerConfig from '../navMenu.seniorEngineer.config'

const getNavMenuConfig = (role: UserRoles): Array<NavMenuItem> => {
  switch (role) {
    case UserRoles.FirstLineSupport: {
      return navMenuCommonConfig
    }

    case UserRoles.SeniorEngineer: {
      return [...navMenuCommonConfig, ...navMenuSeniorEngineerConfig]
    }

    case UserRoles.HeadOfDepartment: {
      return [...navMenuCommonConfig, ...navMenuHeadOfDepartmentConfig]
    }

    case UserRoles.Admin: {
      return navMenuAdminConfig
    }

    default: {
      return navMenuCommonConfig
    }
  }
}

export default getNavMenuConfig
