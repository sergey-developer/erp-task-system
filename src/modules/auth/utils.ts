import { camelizeKeys } from 'humps'

import { UserInfo } from './models'

export const parseJwt = (token: string): UserInfo => {
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
  return camelizeKeys(JSON.parse(jsonPayload)) as unknown as UserInfo
}
