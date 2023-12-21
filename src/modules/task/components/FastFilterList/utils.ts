import negate from 'lodash/negate'

import { FastFilterEnum } from 'modules/task/constants/task'
import { UserRoleEnum } from 'modules/user/constants'

import { FastFilterConfig, fastFiltersConfig } from './constants'

const includeRole = (filter: FastFilterConfig, role: UserRoleEnum) => filter.roles.includes(role)
const notIncludeRole = negate(includeRole)

export const getFastFiltersByRole = (role: UserRoleEnum, inverse?: boolean): FastFilterEnum[] =>
  fastFiltersConfig.reduce<FastFilterEnum[]>((acc, f) => {
    if (inverse) {
      if (notIncludeRole(f, role)) {
        acc.push(f.filter)
      }
    } else {
      if (includeRole(f, role)) {
        acc.push(f.filter)
      }
    }

    return acc
  }, [])
