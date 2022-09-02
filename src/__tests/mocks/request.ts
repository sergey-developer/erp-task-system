import _curry from 'lodash/curry'
import { rest } from 'msw'

import api from '__tests/mocks/api'
import { ResponseResolver, getResponseResolver } from '__tests/mocks/response'
import { HttpMethodEnum, HttpStatusCodeEnum } from 'shared/constants/http'
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
  requestMocker(getResponseResolver({ status: HttpStatusCodeEnum.ServerError }))

export const getUnauthorizedErrorMocker = (
  requestMocker: PartialAppliedRequestMocker,
): AddMockFn =>
  requestMocker(
    getResponseResolver({ status: HttpStatusCodeEnum.Unauthorized }),
  )

export const getBadRequestErrorMocker = (
  requestMocker: PartialAppliedRequestMocker,
): AddMockFn =>
  requestMocker(getResponseResolver({ status: HttpStatusCodeEnum.BadRequest }))
