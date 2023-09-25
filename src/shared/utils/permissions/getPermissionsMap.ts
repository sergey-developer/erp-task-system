import { camelize } from 'humps'

import { Permissions, PermissionsMap } from 'shared/types/permissions'
import { MaybeUndefined } from 'shared/types/utils'

/**
 Proxy добавлен, чтобы при обращении к несуществующему пермишену, например "permissions.canUpdate",
 не возвращался "undefined" т.к. если "canUpdate" будет undefined,
 такая проверка - "!permissions.canUpdate" вернёт true
 */

const proxyHandler = {
  get(target: PermissionsMap, prop: keyof PermissionsMap) {
    return prop in target ? target[prop] : false
  },
}

export const getPermissionsMap = (
  permissions: MaybeUndefined<Permissions[]> = [],
): PermissionsMap => {
  const permissionsMap = permissions.reduce((acc, permission) => {
    const key = camelize(permission) as keyof PermissionsMap
    acc[key] = true
    return acc
  }, {} as PermissionsMap)

  return new Proxy(permissionsMap, proxyHandler)
}
