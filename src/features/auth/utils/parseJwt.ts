import { JwtPayload } from 'features/auth/types'
import { camelizeKeys } from 'humps'

export const parseJwt = (token: string): JwtPayload => {
  try {
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
  } catch (error) {
    console.error('Parse jwt token error: ', error)
    throw error
  }
}
