import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react'
import { createApi } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { AxiosRequestConfig } from 'axios'

import { logout, tokenReceived } from 'modules/auth/authSlice'
import { UserRefreshCreateApiResponse } from 'modules/auth/models'
import MethodEnums from 'shared/constants/http'
import { RootState } from 'state/store'

import baseQuery from './baseQuery'

type CustomBaseQueryFn = BaseQueryFn<{
  url: string
  method?: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
}>

const mutex = new Mutex()
const query = baseQuery({
  apiPath: '/api',
  apiVersion: '/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authReducer.accessToken
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
  if (error && (error as { status: number })?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const { refreshToken: refresh } = (api.getState() as RootState)
          .authReducer
        const refreshResult = await query(
          {
            method: MethodEnums.POST,
            url: '/user/refresh',
            data: {
              refresh,
            },
          },
          api,
          extraOptions,
        )
        if (refreshResult.data) {
          api.dispatch(
            tokenReceived(refreshResult.data as UserRefreshCreateApiResponse),
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

const apiV1 = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
})

export default apiV1
