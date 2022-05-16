import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react'
import { BaseQueryApi } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios'

import { httpClientConfig } from 'configs/httpClient'
import { MethodEnums } from 'shared/constants/http'

type CustomBaseQueryConfig = {
  apiVersion: string
  apiPath: string
  prepareHeaders?: (
    headers: AxiosRequestHeaders,
    api: Pick<
      BaseQueryApi,
      'getState' | 'extra' | 'endpoint' | 'type' | 'forced'
    >,
  ) => AxiosRequestHeaders
}

type CustomBaseQueryFn = BaseQueryFn<{
  url: string
  method?: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
}>

const httpClient = axios.create(httpClientConfig)

const baseQuery =
  ({
    prepareHeaders,
    apiVersion,
    apiPath,
  }: CustomBaseQueryConfig): CustomBaseQueryFn =>
  async (
    { url, method = MethodEnums.GET, data, params },
    api,
    extraOptions,
  ) => {
    const headers = prepareHeaders
      ? prepareHeaders(httpClient.defaults.headers.common, api)
      : undefined

    try {
      const result = await httpClient({
        url: `${apiPath}${apiVersion}${url}`,
        method,
        data,
        params,
        headers,
      })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }

export default baseQuery
