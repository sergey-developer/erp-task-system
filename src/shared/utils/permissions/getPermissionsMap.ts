import { camelize } from 'humps'

import { PermissionsEnum } from 'shared/constants/permissions'
import {
  PermissionsMap,
  PermissionsMapKey,
} from 'shared/interfaces/permissions'

const getPermissionsMap = (
  permissions: Array<PermissionsEnum>,
): PermissionsMap => {
  return permissions.reduce((acc, permission) => {
    const key = camelize(permission) as PermissionsMapKey
    acc[key] = true
    return acc
  }, {} as PermissionsMap)
}

export default getPermissionsMap
