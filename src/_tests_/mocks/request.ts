import _curry from 'lodash/curry'
import { rest } from 'msw'

import api from '_tests_/mocks/api'
import { ResponseResolver, getResponseResolver } from '_tests_/mocks/response'
import { HttpCodeEnum, HttpMethodEnum } from 'shared/constants/http'
import { makeAbsoluteApiUrl } from 'shared/services/api'

export type AddMockFn = () => void

export type PartialAppliedRequestMocker = (
  resolver: ResponseResolver,
) => AddMockFn

export const getRequestMocker = _curry(
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

export const getServerErrorMocker = (
  requestMocker: PartialAppliedRequestMocker,
): AddMockFn =>
  requestMocker(getResponseResolver({ status: HttpCodeEnum.ServerError }))

export const getUnauthorizedErrorMocker = (
  requestMocker: PartialAppliedRequestMocker,
): AddMockFn =>
  requestMocker(getResponseResolver({ status: HttpCodeEnum.Unauthorized }))

export const getBadRequestErrorMocker = (
  requestMocker: PartialAppliedRequestMocker,
): AddMockFn =>
  requestMocker(getResponseResolver({ status: HttpCodeEnum.BadRequest }))
