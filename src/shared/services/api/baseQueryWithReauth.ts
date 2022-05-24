import { Mutex } from 'async-mutex'

import { logout, tokenRefreshed } from 'modules/auth/authSlice'
import { UserRefreshCreateApiResponse } from 'modules/auth/models'
import { HttpMethodEnums, HttpStatusCodeEnum } from 'shared/constants/http'
import { RootState } from 'state/store'

import baseQuery from './baseQuery'
import { TOKEN_REFRESH_PATH } from './constants'
import { CustomBaseQueryFn } from './intefraces'

const mutex = new Mutex()

const query = baseQuery({
  apiPath: '/api',
  apiVersion: '/v1',
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
  if (
    error &&
    (error as { status: number })?.status === HttpStatusCodeEnum.Unauthorized
  ) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const { refreshToken: refresh } = (api.getState() as RootState).auth
        const refreshResult = await query(
          {
            method: HttpMethodEnums.POST,
            url: TOKEN_REFRESH_PATH,
            data: {
              refresh,
            },
          },
          api,
          extraOptions,
        )
        if (refreshResult.data) {
          api.dispatch(
            tokenRefreshed(refreshResult.data as UserRefreshCreateApiResponse),
          )
          result = await query(args, api, extraOptions)
        } else {
          api.dispatch(logout())
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await query(args, api, extraOptions)
    }
  }
  return result
}

export default baseQueryWithReauth
