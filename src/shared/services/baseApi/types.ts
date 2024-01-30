import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react'
import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

import { HttpCodeEnum } from 'shared/constants/http'

export type ValidationErrors = string[]

export type FieldsErrors<T> = {
  [key in keyof T]?: ValidationErrors
}

export type ErrorDataDetail = string | ValidationErrors

export type ErrorData<T extends object = {}> = FieldsErrors<T> & {
  detail?: ErrorDataDetail

  // todo: вынести FieldsErrors и errorList в одно поле
  errorList?: unknown[]
}

export type ErrorResponse<T extends object = {}> = {
  data: ErrorData<T>
  status: HttpCodeEnum
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
  headers?: AxiosRequestConfig['headers']
}>

export type ApiVersionUnion = 'v1'

export type CustomBaseQueryConfig = {
  basePath: string
  apiVersion: ApiVersionUnion
  prepareHeaders?: (
    headers: AxiosRequestHeaders,
    api: Pick<BaseQueryApi, 'getState' | 'extra' | 'endpoint' | 'type' | 'forced'>,
  ) => AxiosRequestHeaders
}
