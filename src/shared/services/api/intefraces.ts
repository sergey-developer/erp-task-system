import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react'
import { BaseQueryApi } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

import { MaybeUndefined } from 'shared/interfaces/utils'

export type ErrorValidation<T> = {
  [key in keyof T]: string[]
}

export type DetailError = string[]

export type Error<T> = ErrorValidation<T> & {
  detail?: DetailError
}

export type ErrorResponse<T = {}> = {
  data: Error<T>
  status: MaybeUndefined<number>
}

/**
  Дополнительно в BaseQueryFn можно передать тип для поля error, но тип в хуках для этого поля
 будет такой: MyCustomErrorType | SerialisedError. Решения как убрать тип SerialisedError
 из этого поля пока не найдено, а данный тип будет мешать при обращении к свойствам поля error
 */
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
