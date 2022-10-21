import curry from 'lodash/curry'
import { rest } from 'msw'

import api from '_tests_/mocks/api'
import {
  ResponseResolver,
  ResponseResolverOptions,
  getResponseResolver,
} from '_tests_/mocks/response'
import { HttpCodeEnum, HttpMethodEnum } from 'shared/constants/http'
import { ErrorData, makeAbsoluteApiUrl } from 'shared/services/api'

export type AddMockFn = () => void

export type PartialAppliedRequestMocker = (
  resolver: ResponseResolver,
) => AddMockFn

export const getRequestMocker = curry(
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

export const getSuccessMocker = (
  requestMocker: PartialAppliedRequestMocker,
  responseOptions: Omit<ResponseResolverOptions, 'status'> = {},
): AddMockFn =>
  requestMocker(
    getResponseResolver({ status: HttpCodeEnum.Ok, ...responseOptions }),
  )

export const getServerErrorMocker = <T extends object = {}>(
  requestMocker: PartialAppliedRequestMocker,
  responseOptions: Omit<ResponseResolverOptions<ErrorData<T>>, 'status'> = {},
): AddMockFn =>
  requestMocker(
    getResponseResolver({
      status: HttpCodeEnum.ServerError,
      ...responseOptions,
    }),
  )

export const getUnauthorizedErrorMocker = <T extends object = {}>(
  requestMocker: PartialAppliedRequestMocker,
  responseOptions: Omit<ResponseResolverOptions<ErrorData<T>>, 'status'> = {},
): AddMockFn =>
  requestMocker(
    getResponseResolver({
      status: HttpCodeEnum.Unauthorized,
      ...responseOptions,
    }),
  )

export const getBadRequestErrorMocker = <T extends object = {}>(
  requestMocker: PartialAppliedRequestMocker,
  responseOptions: Omit<ResponseResolverOptions<ErrorData<T>>, 'status'> = {},
): AddMockFn =>
  requestMocker(
    getResponseResolver({
      status: HttpCodeEnum.BadRequest,
      ...responseOptions,
    }),
  )
