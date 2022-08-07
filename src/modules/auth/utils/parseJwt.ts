import { camelizeKeys } from 'humps'

import { UserRolesEnum } from 'shared/constants/roles'

export type JwtPayload = {
  userId: number
  userRole: UserRolesEnum
}

const parseJwt = (token: string): JwtPayload => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )
  return camelizeKeys(JSON.parse(jsonPayload)) as unknown as JwtPayload
}

export default parseJwt
