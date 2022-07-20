import { Mutex } from 'async-mutex'

import { logout, refreshToken } from 'modules/auth/authSlice'
import { RefreshTokenActionPayload } from 'modules/auth/interfaces'
import { RefreshTokenResponseModel } from 'modules/auth/models'
import parseJwt from 'modules/auth/utils/parseJwt'
import { HttpMethodEnum, HttpStatusCodeEnum } from 'shared/constants/http'
import { RootState } from 'state/store'

import authLocalStorageService from '../../../modules/auth/services/authLocalStorage.service'
import baseQuery from './baseQuery'
import { TOKEN_REFRESH_PATH } from './constants'
import { CustomBaseQueryFn } from './intefraces'

const mutex = new Mutex()

const query = baseQuery({
  apiPath: '/api',
  apiVersion: 'v1',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken
    if (token) {
      headers['authorization'] = `Bearer ${token}`
    }
    return headers
  },
})

const baseQueryWithReauth: CustomBaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock()
  let result = await query(args, api, extraOptions)
  const { error } = result
  /** todo пересмотреть строчку ниже */
  console.log('error: ', error)
  if (
    error &&
    (error as { status: number })?.status === HttpStatusCodeEnum.Unauthorized
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const { refreshToken: refresh } = (api.getState() as RootState).auth
        console.log('api.getState(): ', api.getState())
        const refreshResult = await query(
          {
            method: HttpMethodEnum.POST,
            url: TOKEN_REFRESH_PATH,
            data: {
              refresh,
            },
          },
          api,
          extraOptions,
        )
        console.log('refreshResult: ', refreshResult)
        if (refreshResult.data) {
          const refreshData = refreshResult.data as RefreshTokenResponseModel

          authLocalStorageService.setAccessToken(refreshData.access)
          authLocalStorageService.setRefreshToken(refreshData.refresh)
          console.log('parseJwt: ', parseJwt(refreshData.access))
          api.dispatch(
            refreshToken({
              ...refreshData,
              user: parseJwt(refreshData.access),
            } as RefreshTokenActionPayload),
          )

          result = await query(args, api, extraOptions)
        } else {
          console.log('api.dispatch(logout())')
          api.dispatch(logout())
        }
      } finally {
        console.log('release')
        release()
      }
    } else {
      console.log('mutex.isLocked() === true')
      await mutex.waitForUnlock()
      result = await query(args, api, extraOptions)
    }
  }

  console.log('result: ', result)
  return result
}

export default baseQueryWithReauth
