import { Mutex } from 'async-mutex'
import { AuthApiPathsEnum } from 'features/auth/api/constants'
import { RefreshTokenResponse } from 'features/auth/api/schemas'
import { logoutAndClearTokens, parseJwt } from 'features/auth/helpers'
import { authLocalStorageService } from 'features/auth/services/authLocalStorage.service'
import { refreshToken as refreshTokenAction } from 'features/auth/store/auth.slice'
import { RefreshTokenActionPayload } from 'features/auth/store/types'
import { RootState } from 'store/store'

import { HttpMethodEnum } from 'shared/constants/http'

import baseQuery from './baseQuery'
import { apiPath, currentApiVersion } from './constants'
import { CustomBaseQueryFn } from './types'
import { isClientRangeError, isErrorResponse, isUnauthorizedError } from './utils'

const mutex = new Mutex()

const query = baseQuery({
  basePath: apiPath,
  apiVersion: currentApiVersion,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken

    if (token) headers['authorization'] = `Bearer ${token}`
    else delete headers['authorization']

    return headers
  },
})

const baseQueryWithReauth: CustomBaseQueryFn = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let response = await query(args, api, extraOptions)

  if (response.error && isErrorResponse(response.error) && isUnauthorizedError(response.error)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      let refreshResult

      try {
        const { refreshToken } = (api.getState() as RootState).auth

        if (!refreshToken) logoutAndClearTokens(api.dispatch)

        try {
          refreshResult = await query(
            {
              method: HttpMethodEnum.Post,
              url: AuthApiPathsEnum.RefreshToken,
              data: {
                refresh: refreshToken,
              },
            },
            api,
            extraOptions,
          )

          if (refreshResult.error) {
            throw refreshResult.error
          }

          if (refreshResult.data) {
            const refreshData = refreshResult.data as RefreshTokenResponse

            authLocalStorageService.setAccessToken(refreshData.access)
            authLocalStorageService.setRefreshToken(refreshData.refresh)

            api.dispatch(
              refreshTokenAction({
                ...refreshData,
                user: parseJwt(refreshData.access),
              } as RefreshTokenActionPayload),
            )

            response = await query(args, api, extraOptions)
          } else {
            logoutAndClearTokens(api.dispatch)
          }
        } catch (error) {
          if (isErrorResponse(error)) {
            if (isClientRangeError(error)) {
              logoutAndClearTokens(api.dispatch)
            }
          }
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      /**
       * api.getState() вызывается в нескольких местах, вместо присвоения значения переменной,
       * намеренно, чтобы получить актуальное состояние и при не успешном обновлении токена
       * не отправлялся лишний запрос
       */
      if ((api.getState() as RootState).auth.isLoggedIn) {
        response = await query(args, api, extraOptions)
      }
    }
  }

  return response
}

export type CustomBaseQuery = typeof baseQueryWithReauth

export default baseQueryWithReauth
