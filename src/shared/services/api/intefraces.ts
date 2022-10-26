import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react'
import { BaseQueryApi } from '@reduxjs/toolkit/src/query/baseQueryTypes'
import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

export type ValidationErrors = Array<string>

export type FieldsErrors<T> = {
  [key in keyof T]: ValidationErrors
}

export type ErrorData<T extends Record<string, any> = {}> = FieldsErrors<T> & {
  detail?: ValidationErrors
}

export type ErrorResponse<T extends Record<string, any> = {}> = {
  data: ErrorData<T>
  status: number
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
  basePath: string
  apiVersion: ApiVersionUnion
  prepareHeaders?: (
    headers: AxiosRequestHeaders,
    api: Pick<
      BaseQueryApi,
      'getState' | 'extra' | 'endpoint' | 'type' | 'forced'
    >,
  ) => AxiosRequestHeaders
}
