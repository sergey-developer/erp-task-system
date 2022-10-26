import curry from 'lodash/curry'
import { rest } from 'msw'

import { api } from '_tests_/mocks/api'
import {
  ResponseResolver,
  ResponseResolverOptions,
  getResponseResolver,
} from '_tests_/mocks/response'
import { HttpCodeEnum, HttpMethodEnum } from 'shared/constants/http'
import { ErrorData, makeAbsoluteApiUrl } from 'shared/services/api'

export type AddMockFn = () => void

export type PartialAppliedRequestMockFn = (
  resolver: ResponseResolver,
) => AddMockFn

export const getRequestMockFn = curry(
  (
    method: HttpMethodEnum,
    url: string,
    resolver: ResponseResolver,
  ): AddMockFn => {
    return () => {
      api.use(rest[method](makeAbsoluteApiUrl(url), resolver))
    }
  },
)

export const getSuccessMockFn = (
  requestMockFn: PartialAppliedRequestMockFn,
  responseOptions: Omit<ResponseResolverOptions, 'status'> = {},
): AddMockFn =>
  requestMockFn(
    getResponseResolver({ status: HttpCodeEnum.Ok, ...responseOptions }),
  )

export const getServerErrorMockFn = <T extends object = {}>(
  requestMockFn: PartialAppliedRequestMockFn,
  responseOptions: Omit<ResponseResolverOptions<ErrorData<T>>, 'status'> = {},
): AddMockFn =>
  requestMockFn(
    getResponseResolver({
      status: HttpCodeEnum.ServerError,
      ...responseOptions,
    }),
  )

export const getUnauthorizedErrorMockFn = <T extends object = {}>(
  requestMockFn: PartialAppliedRequestMockFn,
  responseOptions: Omit<ResponseResolverOptions<ErrorData<T>>, 'status'> = {},
): AddMockFn =>
  requestMockFn(
    getResponseResolver({
      status: HttpCodeEnum.Unauthorized,
      ...responseOptions,
    }),
  )

export const getBadRequestErrorMockFn = <T extends Record<any, any> = {}>(
  requestMockFn: PartialAppliedRequestMockFn,
  responseOptions: Omit<ResponseResolverOptions<ErrorData<T>>, 'status'> = {},
): AddMockFn =>
  requestMockFn(
    getResponseResolver({
      status: HttpCodeEnum.BadRequest,
      ...responseOptions,
    }),
  )

export const getNotFoundErrorMockFn = <T extends object = {}>(
  requestMockFn: PartialAppliedRequestMockFn,
  responseOptions: Omit<ResponseResolverOptions<ErrorData<T>>, 'status'> = {},
): AddMockFn =>
  requestMockFn(
    getResponseResolver({
      status: HttpCodeEnum.NotFound,
      ...responseOptions,
    }),
  )

export const getForbiddenErrorMockFn = <T extends object = {}>(
  requestMockFn: PartialAppliedRequestMockFn,
  responseOptions: Omit<ResponseResolverOptions<ErrorData<T>>, 'status'> = {},
): AddMockFn =>
  requestMockFn(
    getResponseResolver({
      status: HttpCodeEnum.Forbidden,
      ...responseOptions,
    }),
  )
