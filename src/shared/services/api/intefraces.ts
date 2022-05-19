import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react'
import { AxiosRequestConfig } from 'axios'

import { MaybeUndefined } from 'shared/interfaces/utils'

export type ErrorValidation<T> = {
  [key in keyof T]: string[]
}

export type Error<T> = ErrorValidation<T> & {
  detail?: string
}

export type ErrorResponse<T> = {
  data: Error<T>
  status: MaybeUndefined<number>
}

export type CustomBaseQueryFn = BaseQueryFn<{
  url: string
  method?: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
}>
