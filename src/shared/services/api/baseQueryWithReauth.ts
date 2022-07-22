import { Mutex } from 'async-mutex'

import { logout, refreshToken } from 'modules/auth/authSlice'
import { RefreshTokenActionPayload } from 'modules/auth/interfaces'
import { RefreshTokenResponseModel } from 'modules/auth/models'
import authLocalStorageService from 'modules/auth/services/authLocalStorage.service'
import parseJwt from 'modules/auth/utils/parseJwt'
import { HttpMethodEnum, HttpStatusCodeEnum } from 'shared/constants/http'
import { RootState } from 'state/store'

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
  let response = await query(args, api, extraOptions)

  if (response.error?.status === HttpStatusCodeEnum.Unauthorized) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const { refreshToken: refresh } = (api.getState() as RootState).auth

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

        if (refreshResult.data) {
          const refreshData = refreshResult.data as RefreshTokenResponseModel

          authLocalStorageService.setAccessToken(refreshData.access)
          authLocalStorageService.setRefreshToken(refreshData.refresh)

          api.dispatch(
            refreshToken({
              ...refreshData,
              user: parseJwt(refreshData.access),
            } as RefreshTokenActionPayload),
          )

          response = await query(args, api, extraOptions)
        } else {
          api.dispatch(logout())
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
