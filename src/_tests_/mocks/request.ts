import curry from 'lodash/curry'
import { rest } from 'msw'

import { HttpCodeEnum, HttpMethodEnum } from 'shared/constants/http'
import { makeAbsoluteApiUrl } from 'shared/services/baseApi'
import { EmptyFn } from 'shared/types/utils'

import {
  getResponseResolver,
  ResponseResolver,
  ResponseResolverOptions,
} from '_tests_/mocks/response'
import { server } from '_tests_/mocks/server'

export type AddMockFn = EmptyFn

export type PartialAppliedRequestMockFn = (resolver: ResponseResolver) => AddMockFn

export const getRequestMockFn = curry(
  (method: HttpMethodEnum, url: string, resolver: ResponseResolver): AddMockFn => {
    return () => {
      server.use(rest[method](makeAbsoluteApiUrl(url), resolver))
    }
  },
)

export const getSuccessMockFn = (
  requestMockFn: PartialAppliedRequestMockFn,
  responseOptions: Omit<ResponseResolverOptions, 'status'> = {},
): AddMockFn => requestMockFn(getResponseResolver({ status: HttpCodeEnum.Ok, ...responseOptions }))

export const getServerErrorMockFn = (
  requestMockFn: PartialAppliedRequestMockFn,
  responseOptions: Omit<ResponseResolverOptions, 'status'> = {},
): AddMockFn =>
  requestMockFn(
    getResponseResolver({
      status: HttpCodeEnum.ServerError,
      ...responseOptions,
    }),
  )

export const getUnauthorizedErrorMockFn = (
  requestMockFn: PartialAppliedRequestMockFn,
  responseOptions: Omit<ResponseResolverOptions, 'status'> = {},
): AddMockFn =>
  requestMockFn(
    getResponseResolver({
      status: HttpCodeEnum.Unauthorized,
      ...responseOptions,
    }),
  )

export const getBadRequestErrorMockFn = (
  requestMockFn: PartialAppliedRequestMockFn,
  responseOptions: Omit<ResponseResolverOptions, 'status'> = {},
): AddMockFn =>
  requestMockFn(
    getResponseResolver({
      status: HttpCodeEnum.BadRequest,
      ...responseOptions,
    }),
  )

export const getNotFoundErrorMockFn = (
  requestMockFn: PartialAppliedRequestMockFn,
  responseOptions: Omit<ResponseResolverOptions, 'status'> = {},
): AddMockFn =>
  requestMockFn(
    getResponseResolver({
      status: HttpCodeEnum.NotFound,
      ...responseOptions,
    }),
  )

export const getForbiddenErrorMockFn = (
  requestMockFn: PartialAppliedRequestMockFn,
  responseOptions: Omit<ResponseResolverOptions, 'status'> = {},
): AddMockFn =>
  requestMockFn(
    getResponseResolver({
      status: HttpCodeEnum.Forbidden,
      ...responseOptions,
    }),
  )
