import { Mutex } from 'async-mutex'

import { refreshToken as refreshTokenAction } from 'modules/auth/auth.slice'
import { AuthEndpointsEnum } from 'modules/auth/constants/api'
import { RefreshTokenActionPayload } from 'modules/auth/interfaces'
import { RefreshTokenResponseModel } from 'modules/auth/models'
import authLocalStorageService from 'modules/auth/services/authLocalStorage.service'
import logoutAndClearTokens from 'modules/auth/utils/logoutAndClearTokens'
import parseJwt from 'modules/auth/utils/parseJwt'
import { HttpMethodEnum } from 'shared/constants/http'
import { MaybeUndefined } from 'shared/interfaces/utils'
import { RootState } from 'state/store'

import baseQuery from './baseQuery'
import { apiPath, currentApiVersion } from './constants'
import { CustomBaseQueryFn, ErrorResponse } from './intefraces'
import { isClientRangeError, isUnauthorizedError } from './utils'

const mutex = new Mutex()

const query = baseQuery({
  basePath: apiPath,
  apiVersion: currentApiVersion,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken

    if (token) {
      headers['authorization'] = `Bearer ${token}`
    } else {
      delete headers['authorization']
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
  let response = await query(args, api, extraOptions)
  const error = response.error as MaybeUndefined<ErrorResponse>

  if (error && isUnauthorizedError(error)) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const { refreshToken } = (api.getState() as RootState).auth

        if (refreshToken) {
          let refreshResult

          try {
            refreshResult = await query(
              {
                method: HttpMethodEnum.Post,
                url: AuthEndpointsEnum.RefreshToken,
                data: {
                  refresh: refreshToken,
                },
              },
              api,
              extraOptions,
            )
          } catch (exception) {
            const error = exception as ErrorResponse

            if (isClientRangeError(error)) {
              logoutAndClearTokens(api.dispatch)
            }

            throw error
          }

          if (refreshResult.data) {
            const refreshData = refreshResult.data as RefreshTokenResponseModel

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
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      response = await query(args, api, extraOptions)
    }
  }

  return response
}

export default baseQueryWithReauth
