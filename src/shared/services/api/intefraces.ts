import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react'
import { BaseQueryApi } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

import { MaybeUndefined } from 'shared/interfaces/utils'

export type ErrorValidation<T> = {
  [key in keyof T]: string[]
}

export type Error<T> = ErrorValidation<T> & {
  detail?: string
}

export type ErrorResponse<T = {}> = {
  data: Error<T>
  status: MaybeUndefined<number>
}

export type CustomBaseQueryFn = BaseQueryFn<{
  url: string
  method?: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
}>

export type ApiVersionUnion = 'v1'

export type CustomBaseQueryConfig = {
  apiVersion: ApiVersionUnion
  apiPath: string
  prepareHeaders?: (
    headers: AxiosRequestHeaders,
    api: Pick<
      BaseQueryApi,
      'getState' | 'extra' | 'endpoint' | 'type' | 'forced'
    >,
  ) => AxiosRequestHeaders
}
